/**
 * Cloudflare Worker — Proxy seguro para Google Sheets
 * Dashboard CNP — Cromador Nível Pro
 *
 * SECRETS (Settings > Variables and Secrets):
 *   SHEET_ID_<MMAA>  → um secret por lançamento, resolvido por convenção de nome.
 *   SHEET_ID_0426    → ID da planilha CNP1 2026 (abr/2026)
 *   SHEET_ID_0726    → 1Zq9mh_3ZSDlM9NeXPLGQ_ArkjpLLt0PiSwlS07LFQng (jul/2026)
 *   SHEET_ID_1026    → 1mTqd9d5usgx5VERtfT6tk-_P4D-na2bTDqhcy_64MkM (out/2026)
 *   GOOGLE_SA_KEY    → JSON completo da Service Account GCP
 *
 * Para abrir um lançamento novo basta criar o secret SHEET_ID_<MMAA>:
 * este arquivo não precisa mais ser alterado.
 *
 * ATENÇÃO: não cole aqui a versão antiga com o ternário `lancamento === '0726'`.
 * Ela faz todo lançamento fora do 0726 cair no 0426 silenciosamente — foi o bug
 * corrigido em 10/10/2026, quando ?lancamento=1026 servia a planilha do 0426.
 *
 * USO:
 *   ?sheet=Dados Meta Ads&lancamento=0426
 *   ?sheet=Dados Meta Ads&lancamento=0726
 *   ?sheet=Dados Meta Ads&lancamento=1026
 */

const ALLOWED_SHEETS = [
  'Dados Meta Ads',
  'Elementor',
  'Pesquisa',
  'Pesquisa Compradores',
  'Planejamento',
  'Dados Google Ads',
  'Página1',
  'Metas Vendas',
  'Abandonos',
];

const ALLOWED_ORIGINS = [
  'https://suporteb16-collab.github.io',
  'https://henriquecardosos96.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

async function getAccessToken(saKeyJson) {
  const sa = JSON.parse(saKeyJson);
  const now = Math.floor(Date.now() / 1000);
  const header  = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const enc = (obj) => btoa(JSON.stringify(obj))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const signingInput = `${enc(header)}.${enc(payload)}`;
  const pemNorm = sa.private_key.replace(/\\n/g, '\n').replace(/\\r/g, '');
  const pemBody = pemNorm
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');
  const keyData = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', keyData.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(signingInput)
  );
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const jwt = `${signingInput}.${sigB64}`;
  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenResp.json();
  if (!tokenData.access_token) throw new Error('Falha ao obter access_token: ' + JSON.stringify(tokenData));
  return tokenData.access_token;
}

async function fetchSheetAsCSV(sheetId, sheetName, accessToken) {
  const range = encodeURIComponent(sheetName);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Sheets error ${resp.status} para aba "${sheetName}": ${errText}`);
  }
  const data = await resp.json();
  const rows = data.values || [];
  if (rows.length === 0) return '';
  return rows.map(function(row) {
    return row.map(function(cell) {
      const s = String(cell === null || cell === undefined ? '' : cell);
      if (s.includes(',') || s.includes('"') || s.includes('\n'))
        return '"' + s.replace(/"/g, '""') + '"';
      return s;
    }).join(',');
  }).join('\n');
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request);
    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: corsHeaders });

    const url        = new URL(request.url);
    const sheet      = url.searchParams.get('sheet');
    const lancamento = url.searchParams.get('lancamento') || '0426';

    if (!sheet || !ALLOWED_SHEETS.includes(sheet)) {
      return new Response(
        JSON.stringify({ error: 'Aba não autorizada: ' + sheet }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Valida o formato MMAA antes de indexar o env — sem isso, um `lancamento`
    // arbitrário na querystring viraria nome de variável de ambiente.
    if (!/^\d{4}$/.test(lancamento)) {
      return new Response(
        JSON.stringify({ error: 'Lançamento inválido: ' + lancamento }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Seleciona SHEET_ID por convenção de nome: SHEET_ID_<MMAA>.
    // Lançamento novo = criar o secret, sem mexer neste arquivo.
    // O fallback para SHEET_ID (sem sufixo) cobre o 0426 legado.
    const sheetId = env[`SHEET_ID_${lancamento}`]
      || (lancamento === '0426' ? env.SHEET_ID : undefined);

    if (!sheetId) {
      return new Response(
        JSON.stringify({ error: 'SHEET_ID não configurado para lançamento: ' + lancamento }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const saRaw = typeof env.GOOGLE_SA_KEY === 'string'
        ? env.GOOGLE_SA_KEY : JSON.stringify(env.GOOGLE_SA_KEY);
      const accessToken = await getAccessToken(saRaw);
      const csv = await fetchSheetAsCSV(sheetId, sheet, accessToken);
      return new Response(csv, {
        headers: { ...corsHeaders, 'Content-Type': 'text/csv; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    } catch (err) {
      console.error('[Worker]', err.message);
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};
