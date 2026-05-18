# 📊 Dashboard CNP0426 — Cromador Nível Pro

Dashboard de performance desenvolvido pela **Agência B16** para acompanhamento em tempo real do lançamento **Cromador Nível Pro** da Mundial Cromo.

🔗 **Acesse o dashboard:** [https://henriquecardosos96.github.io/dashboard-b16/](https://henriquecardosos96.github.io/dashboard-b16-cnp0426/)

---

## 🎯 Sobre o projeto

Este dashboard foi construído para centralizar e visualizar os dados de mídia paga e captação de leads de uma campanha de lançamento digital, permitindo decisões rápidas e baseadas em dados durante o período de veiculação.

Os dados são atualizados automaticamente a cada 2 horas diretamente do Google Sheets, sem necessidade de exportação manual ou ferramentas pagas de BI.

---

## 📦 Fontes de dados

| Fonte | Aba no Sheets | Atualização |
|---|---|---|
| Meta Ads (Facebook/Instagram) | `Dados Meta Ads` | Manual (exportação do Ads Manager) |
| Leads / Elementor (WordPress) | `Elementor` | Manual diário |
| Pesquisa de público | `Pesquisa` | Automática (formulário conectado) |

---

## 📈 O que o dashboard exibe

### Visão Geral
- Valor investido nas campanhas `[CNP]`
- Total de leads captados (pagos e orgânicos)
- CPL — Custo por Lead médio
- Melhor CPL por criativo

### Funil de Conversão
- Impressões → Alcance → Cliques → Landing Page View → Leads
- Taxa de conversão entre cada etapa
- Custo por etapa (CPM, CP Alcance, CPC, CP LPV, CPL)

### Evolução Diária
- Investimento por dia
- Leads por dia
- CPL por dia
- Leads pagos vs orgânicos

### Criativos & Distribuição
- Top criativos por volume de leads
- Tabela completa: criativo | valor gasto | leads | CPL
- Distribuição por plataforma (Instagram vs Facebook)
- Distribuição por formato (Reels, Stories, Feed)

### CPL por Público
- Comparativo FRIO vs QUENTE
- Investimento, leads e CPL por segmento

### Pesquisa de Público
- % de leads que responderam a pesquisa
- 11 gráficos de distribuição de respostas (Q1 a Q11)

### Insights — Gestor de Tráfego
- Análises automáticas geradas a partir dos dados
- Identificação de gargalos, oportunidades e recomendações de otimização
- Atualizados a cada refresh dos dados

---

## 🛠️ Tecnologias utilizadas

- **HTML/CSS/JS** puro — sem frameworks, sem dependências pesadas
- **Chart.js** para visualizações
- **Google Sheets** como banco de dados via CSV público
- **GitHub Pages** para hospedagem gratuita e entrega via HTTPS

---

## 🔄 Como atualizar os dados

1. Exporte os dados do Meta Ads Manager e cole na aba `Dados Meta Ads`
2. Atualize os leads na aba `Elementor` e registre a data na célula `Q2`
3. O dashboard busca os dados automaticamente a cada 2h — ou clique em **🔄 Atualizar** para forçar

---

## 🏢 Desenvolvido por

**Agência B16** — Henrique Cardoso, Business Inteligence. Data: 09/04/2026.

## 📋 Changelog — Histórico de Versões

### v5 · 09/04/2026
`feat: abas reordenadas, perfil alvo, insights de mídia e perfil, comparação pesquisa`

**Novas funcionalidades:**
- Ordem das abas alterada: Visão Geral → Pesquisa → Insights
- Aba Pesquisa: seção "Comparação com Perfil Alvo" com 10 cards (Q1–Q11)
  - Badge 🎯 Perto / ⚡ Longe do alvo por dimensão
  - Barras de progresso com percentual real vs threshold definido
  - Barras dos gráficos em amarelo B16 para respostas dentro do perfil alvo
- Aba Insights dividida em duas seções:
  - **Insights de Mídia** — análises de tráfego (CTR, CPL, criativos, público)
  - **Insights de Perfil** — comparação automática com o avatar do lançamento (idade, gênero, renda, ocupação, canal de descoberta, motivação)
- Perfil alvo integrado ao código: homem, 18–35 anos, baixa renda, CLT/informal, busca negócio próprio

---

### v4 · 09/04/2026
`feat: filtro de data, comparativo de períodos, abas, rodapé com legenda`

**Novas funcionalidades:**
- Filtro de período principal + período de comparação no header
- Delta percentual nos big numbers (▲▼ vs período comparativo)
- Sistema de 3 abas: Visão Geral, Insights, Pesquisa
- Rodapé fixo com legenda explicando o significado das cores (verde, amarelo, vermelho)
- Badge "COMPARATIVO ATIVO" quando período de comparação está selecionado

---

### v3 · 09/04/2026
`feat: tabela de criativos, leitura dinâmica das 3 abas do Sheets`

**Novas funcionalidades:**
- Tabela de performance por criativo: nome curto + nome completo | valor gasto | leads | CPL
- CPL colorido: verde (<R$3), laranja (R$3–7), vermelho (>R$7)
- 🏆 badge no criativo com melhor CPL
- Leitura dinâmica da aba Pesquisa (Q1–Q11, gráficos de barra horizontal)
- Big number de % de respondentes da pesquisa
- `Promise.all` para buscar as 3 abas em paralelo (mais rápido)

---

### v2 · 09/04/2026
`fix: parser CSV robusto + conexão ao vivo com Google Sheets`

**Correções e melhorias:**
- Parser CSV reescrito para lidar com campos que contêm vírgulas no nome (coluna `Spend (Cost, Amount Spent)`)
- Função `num()` com busca flexível por substring — resistente a variações de nome do Sheets
- Dashboard hospedado no GitHub Pages (HTTPS resolve bloqueio de CORS)
- Conexão ao vivo com Google Sheets via `gviz/tq?tqx=out:csv`
- Atualização automática a cada 2 horas com contador regressivo
- Badge de status: 🟡 Carregando → 🟢 Ao vivo → 🔴 Erro
- Botão 🔄 Atualizar para refresh manual

---

### v1 · 09/04/2026
`feat: dashboard inicial com dados estáticos`

**Funcionalidades:**
- Big numbers: Valor Investido, Total de Leads, CPL, Melhor CPL por criativo
- Funil de conversão: Impressões → Alcance → Cliques → LPV → Leads (com custo por etapa)
- Gráficos diários: investimento, leads, CPL, pagos vs orgânicos
- Top criativos por leads (barra horizontal)
- Distribuição por plataforma (Instagram vs Facebook) com ícones SVG
- Distribuição por formato (Reels, Stories, Feed) — pizza
- CPL por público: FRIO vs QUENTE
- 8 insights automáticos de gestor de tráfego
- Logo B16 embutida em base64
- Visual clean: fundo off-white, preto e amarelo B16
- Dados de leads estáticos (WordPress/Elementor)
- Filtro por campanhas com tag `[CNP]` a partir de 05/04/2026


### v6 · 10/04/2026
`feat: previsao de leads com slider + 3 cenarios dinamicos`

**Novas funcionalidades:**
- Seção "Previsão de Leads até o Evento" no topo da aba Insights
- Slider de investimento de R$ 0 a R$ 70.000 (passo R$ 500)
- 3 cenários calculados automaticamente com base no CPL atual:
  - 🚀 Otimista: CPL atual × 1,0
  - 🎯 Realista: CPL atual × 1,36 (+36%)
  - 🛡️ Conservador: CPL atual × 1,56 (+56%)
- Cenários atualizam automaticamente quando o período ou dados mudam
- Nota metodológica explicando a lógica dos multiplicadores


# 📊 Dashboard CNP0426 — Cromador Nível Pro

> Documentação técnica e operacional do dashboard de captação do lançamento CNP0426 — Agência B16.

---

## Visão Geral

Dashboard de acompanhamento em tempo real do lançamento **Cromador Nível Pro (CNP0426)**. Integra dados de Meta Ads, Elementor (leads), Pesquisa de público e Planejamento de investimento por fase. Lê todas as fontes diretamente do Google Sheets via CSV público, sem backend.

- **Arquivo:** `index.html`
- **Hospedagem:** GitHub Pages — `https://henriquecardosos96.github.io/dashboard-b16/`
- **Atualização automática:** a cada 2 horas
- **Atualização manual:** botão 🔄 no header

---

## Fonte de Dados

| Constante | Aba | Conteúdo |
|---|---|---|
| `SHEET_META` | `Dados Meta Ads` | Métricas diárias das campanhas |
| `SHEET_WP` | `Elementor` | Leads capturados via formulário |
| `SHEET_PESQ` | `Pesquisa` | Respostas da pesquisa de público |
| `SHEET_PLAN` | `Planejamento` | Metas de investimento por fase |

**Planilha:** `1-TPcsDTXvBUxJ30FAPrpkzw71qY4DYUA210I0V_SklQ`
**Filtro global de campanha:** apenas linhas onde `Campaign Name` contém `[CNP]`

> ⚠️ A planilha precisa estar **pública** (qualquer pessoa com o link pode ver) para o dashboard funcionar.

---

## Estrutura das Abas da Planilha

### Aba `Dados Meta Ads`

Exportação diária do Meta Ads Manager. Colunas utilizadas:

| Coluna | Descrição |
|---|---|
| `Date` | Data no formato `YYYY-MM-DD` |
| `Campaign Name` | Nome da campanha. Deve conter `[CNP]`. Tag de fase entre colchetes (ex: `[LEADS]`, `[AQUECIMENTO]`) |
| `Ad Name` | Nome do anúncio (criativo) |
| `Adset Name` / `Ad Set Name` | Nome do conjunto de anúncios |
| `Spend (Cost, Amount Spent)` | Valor investido no dia (R$) |
| `Reach (Estimated)` | Alcance estimado |
| `Impressions` | Total de impressões |
| `Inline Link Clicks` | Total de cliques |
| `Action Landing Page View` | Visualizações de landing page |
| `Action Leads` | Leads registrados pelo pixel do Meta |

> **Filtro de Visão Geral:** o campo `Valor Investido` e as métricas principais consideram **apenas** campanhas com `[CNP]` + `[LEADS]` no nome. As demais fases (Aquecimento, Remarketing etc.) aparecem somente na aba Planejamento.

---

### Aba `Elementor`

Base de leads capturados via formulário Elementor. Colunas utilizadas:

| Coluna | Descrição |
|---|---|
| `Nome*` / `Nome` | Nome do lead (presença = lead válido) |
| `Created At` | Data/hora de criação (`YYYY-MM-DD HH:MM:SS`) |
| `utm_source` | Fonte UTM. `frio` ou `quente` define a segmentação |
| `utm_campaign` | Campanha UTM. Deve conter `cnp` para ser considerado pago |
| `utm_content` | Criativo UTM — cruzado com `Ad Name` do Meta para calcular CPL por criativo |
| `utm_medium` | Conjunto de anúncios UTM — cruzado com `Adset Name` do Meta para calcular CPL por adset |
| `utm_term` | Formato/posicionamento (ex: `Instagram_Reels`, `Facebook_Feed`) |
| `atualizado_em` | Timestamp da última atualização da planilha |

**Leads pagos** = registros com `utm_source` preenchido E `utm_campaign` contendo `cnp`.

---

### Aba `Pesquisa`

Respostas da pesquisa de qualificação de público. Colunas esperadas:

| Coluna | Mapeamento interno |
|---|---|
| `Carimbo de data/hora` | Data da resposta |
| `Qual a sua idade?` | Q1 |
| `Qual seu gênero?` | Q2 |
| `Por onde você conheceu o perfil da Mundial Cromo?` | Q4 |
| `Com oque você trabalha atualmente?` | Q5 |
| `Qual sua renda mensal atualmente?` | Q8 |

As respostas chegam em **texto livre** (ex: `"18 a 24 anos"`) e são convertidas para **slugs internos** (ex: `"18-24"`) via tabela de-para embutida no código.

**Separação por data:**
- **Lançamento atual:** respostas a partir de `08/04/2026`
- **Base histórica:** respostas anteriores a `08/04/2026` (~1.800 registros)

---

### Aba `Planejamento`

Metas de investimento por fase do lançamento. Formato esperado:

| Coluna | Tipo | Exemplo |
|---|---|---|
| `Fase` | Texto | `Captação` |
| `TAG CAMPANHA` | Texto | `LEADS` |
| `Meta` | Número (formato BR) | `36.600,00` |

> O campo `Meta` deve estar no formato brasileiro com ponto como separador de milhar e vírgula como decimal (ex: `36.600,00`). O dashboard converte automaticamente.

A TAG é buscada dentro do `Campaign Name` do Meta Ads. Ex: se TAG = `AQUECIMENTO`, o dashboard soma o spend de todas as campanhas que contêm `[AQUECIMENTO]` no nome.

---

## Abas do Dashboard

### 📊 Visão Geral

Big numbers de campanha + gráficos diários + tabelas de performance.

**Big Numbers:**
- Valor Investido · Total Leads · CPL · 🏆 Melhor CPL (criativo)
- Cada card exibe delta ▲▼ vs período comparativo (quando ativo)

**Funil de conversão:**
```
Impressões → Alcance → Cliques → Landing Page View → Leads pagos
```

**Gráficos diários:** Investimento · Leads pagos · CPL · Leads pagos vs Orgânicos

**Criativos e Distribuição:**
- Top criativos (barras horizontais)
- Tabela: Criativo | Valor Gasto | Leads | CPL (colorido)
- Por Plataforma: donut Instagram vs Facebook
- Por Formato: donut Reels / Stories / Feed

**Tabela Conjuntos de Anúncios** *(cruzamento Meta × Elementor):*
- Coluna Leads = registros do Elementor com `utm_medium` = nome do adset
- CPL = Spend Meta ÷ Leads Elementor
- Filtrado para campanhas `[CNP]`

**Tabela Campanhas** *(Action Leads do Meta):*
- Coluna Leads = campo `Action Leads` da planilha Meta Ads
- CPL = Spend ÷ Action Leads
- Filtrado para campanhas `[CNP]`

**CPL por Público:** cards FRIO ❄️ e QUENTE 🔥 com CPL, leads e % do total

---

### 🗓️ Planejamento

Acompanhamento do orçamento executado por fase do lançamento.

**Timeline horizontal:** cada fase posicionada cronologicamente com:
- Ícone da fase
- % de orçamento executado (`Spend acumulado ÷ Meta da fase`)
- Cores: 🟢 verde (<75%) · 🟡 amarelo (75–100%) · 🔴 vermelho (>100%)
- Meta = 0 → exibe `0,0%`

**Tabela detalhe:** Fase | Meta (R$) | Gasto (R$) | % Executado (com barra de progresso)

**Fases configuradas:**

| Fase | TAG | Meta |
|---|---|---|
| Captação | `[LEADS]` | R$ 36.600 |
| Lembrete | `[LEMBRETE]` | R$ 3.050 |
| Aquecimento | `[AQUECIMENTO]` | R$ 12.200 |
| Remarketing | `[RMKT]` | R$ 12.200 |
| Flash Opening | `[FLASH]` | R$ 0 |

---

### 📋 Pesquisa

Análise de perfil dos leads respondentes vs público alvo vs base histórica.

**Cards de resumo:**
- Total de Respondentes (lançamento ≥ 08/04)
- Base Histórica (anteriores a 08/04)
- % Leads-Respondentes = Respondentes ÷ Total de Leads

**Alinhamento com Perfil Alvo:** cards Q1/Q2/Q4/Q5/Q8 com:
- % atual do lançamento
- Delta ▲▼ em pontos percentuais vs base histórica
- Badge 🎯 PERTO / ⚡ LONGE vs threshold definido

**Perfil alvo configurado:**

| Q | Métrica | Alvo | Threshold |
|---|---|---|---|
| Q1 | Idade | 18–34 anos | ≥ 50% |
| Q2 | Gênero | Homens | ≥ 55% |
| Q4 | Canal | Instagram ou YouTube | ≥ 60% |
| Q5 | Ocupação | CLT / Autônomo / Desempregado | ≥ 50% |
| Q8 | Renda | Até R$ 3.000/mês | ≥ 50% |

**Gráficos por pergunta:** barras duplas comparando lançamento (amarelo) vs histórico (cinza), com eixo X em percentual (0–100%).

---

### 💡 Insights

Gerados automaticamente com base nos dados do período selecionado.

**Insights de Mídia:** CTR, taxa LPV, conversão LP, criativos outliers, distribuição de formatos, CPL competitivo.

**Insights de Perfil:** análise automática de Q1/Q2/Q4/Q5/Q8 vs perfil alvo — alinhado ou fora, com recomendação de ação.

**Previsão de Leads:** slider de investimento (R$0–70k) com 3 cenários:
- 🚀 Otimista — CPL atual × 1,0
- 🎯 Realista — CPL atual × 1,36
- 🛡️ Conservador — CPL atual × 1,56

---

## Filtros

| Filtro | Comportamento |
|---|---|
| **Período principal** | Data inicial e final. Padrão: primeiro ao último dia com dados [CNP] |
| **Comparativo** | Período secundário para deltas ▲▼. Opcional |
| **Botão Aplicar** | Recalcula tudo com os filtros selecionados |
| **Botão Limpar** | Volta ao período padrão sem comparativo |

---

## Métricas Calculadas

| Métrica | Fórmula |
|---|---|
| CPL (Visão Geral) | Spend [CNP][LEADS] ÷ Leads pagos (Elementor) |
| CPL por Criativo | Spend (Meta, por Ad Name) ÷ Leads (Elementor, por utm_content) |
| CPL por Adset | Spend (Meta, por Adset Name) ÷ Leads (Elementor, por utm_medium) |
| CPL por Campanha | Spend (Meta) ÷ Action Leads (Meta) |
| CPM | Spend ÷ Impressões × 1.000 |
| CPC | Spend ÷ Cliques |
| CTR | Cliques ÷ Impressões × 100 |
| Taxa LPV | LPV ÷ Cliques × 100 |
| Taxa Lead | Leads ÷ LPV × 100 |
| % Executado (Fase) | Spend acumulado da TAG ÷ Meta da fase × 100 |
| % Leads-Respondentes | Respondentes lançamento ÷ Total leads × 100 |

---

## Publicação no GitHub Pages

1. Fazer upload do `index.html` na raiz do repositório `dashboard-b16`
2. Em *Settings → Pages*, selecionar branch `main` e pasta `/ (root)`
3. Acessar: `https://henriquecardosos96.github.io/dashboard-b16/`

> Após subir uma nova versão do arquivo, o GitHub Pages atualiza em ~1–2 minutos.

---

## Estrutura Técnica

```
index.html (dashboard_cnp0426_v8.html)
├── CSS inline — design system B16
│   ├── Paleta: fundo #F4F4F2, amarelo #D4A800, preto #111
│   └── Fontes: Bebas Neue (números) + DM Sans (texto)
├── HTML
│   ├── Header: filtros de período + botão atualizar + status badge
│   └── 4 abas: Visão Geral / Planejamento / Pesquisa / Insights
└── JavaScript (ES5 puro — sem async/await, sem template literals aninhados)
    ├── parseCSV()            — parser robusto com suporte a aspas e vírgulas
    ├── processMeta()         — agrega spend, métricas, byAdset, byCamp (filtro [CNP])
    ├── processWP()           — agrega leads, byContent, byMedium, bySource, byTerm
    ├── processPesquisa()     — separa lançamento vs histórico por data de corte
    ├── processarPesqRows()   — converte texto livre → slug via TEXTO_PARA_SLUG
    ├── filterMeta()          — filtra [CNP]+[LEADS] para Visão Geral
    ├── filterMetaAll()       — filtra [CNP] para Planejamento e tabelas de fase
    ├── renderDashboard()     — orquestra todos os renders
    ├── renderPlanejamento()  — timeline + tabela de fases com % executado
    ├── renderPesquisa()      — cards de alinhamento + gráficos comparativos
    ├── renderInsights()      — cards automáticos de mídia e perfil
    └── updatePrevisao()      — cálculo de cenários via slider
```

**Dependências externas:**
- Chart.js 4.4.1 via CDN (Cloudflare)
- Google Fonts (Bebas Neue + DM Sans)

---

## Histórico de Versões

| Versão | O que mudou |
|---|---|
| v1 | Dados estáticos |
| v2 | Parser CSV robusto, conexão ao vivo com Google Sheets |
| v3 | Tabela de criativos, leitura de 3 abas |
| v4 | Filtro de data, comparativo de períodos com deltas ▲▼ |
| v5 | Comparativo perfil alvo + insights de perfil, reordenação de abas |
| v6 | Previsão de leads com slider de investimento e 3 cenários |
| v7 | Aba Pesquisa com comparativo lançamento vs histórico (≥08/04 vs <08/04), novo card % leads-respondentes, gráfico CPL com eixo zero |
| v8 | Aba Planejamento com timeline e % por fase; tabelas de Adsets e Campanhas; filtro Visão Geral somente [CNP]+[LEADS]; pesquisa focada em Q1/Q2/Q4/Q5/Q8; parser numérico BR corrigido |

---

## Contato & Manutenção

- **Agência:** B16
- **Repositório:** `github.com/henriquecardosos96/dashboard-b16`
- **Planilha de dados:** acesso via conta `henrscard@gmail.com`
