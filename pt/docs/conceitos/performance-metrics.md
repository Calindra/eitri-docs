# Métricas de Performance — Eitri App

> As métricas são coletadas automaticamente a cada carregamento do app e exibidas diretamente no terminal durante o ciclo de desenvolvimento.

---

## Métricas Capturadas

| Métrica  | Tipo                       | Descrição                                  |
| -------- | -------------------------- | ------------------------------------------ |
| `cls`    | Estabilidade visual        | Cumulative Layout Shift                    |
| `fcp`    | Velocidade de carregamento | First Contentful Paint                     |
| `lcp`    | Velocidade de carregamento | Largest Contentful Paint                   |
| `load`   | Temporização de navegação  | Início do evento de carregamento da página |
| `score`  | Calculado                  | Pontuação de performance ponderada (0–100) |
| `rating` | Calculado                  | Classificação legível baseada no score     |

---

## CLS — Cumulative Layout Shift

**O que mede:** Quantifica o quanto o conteúdo visível se desloca inesperadamente durante o ciclo de vida da página. Um layout shift ocorre quando um elemento muda de posição entre frames renderizados sem interação do usuário.

**Fórmula:**

```
layout shift score = impact fraction × distance fraction
```

**Impact fraction** — porção do viewport afetada pelo elemento instável:

![Exemplo de impact fraction do CLS](https://web.dev/static/articles/cls/image/impact-fraction-example-164341c82ee76.png){ .off-glb }

**Distance fraction** — maior distância que o elemento percorreu em relação ao viewport:

![Exemplo de distance fraction do CLS](https://web.dev/static/articles/cls/image/distance-fraction-example-9146d2a862482.png){ .off-glb }

O CLS acumula todos os scores de layout shift inesperados ao longo de todo o ciclo de vida da página.

**Limites (Web Vitals oficiais):**

![Gráfico de limites do CLS](https://web.dev/static/articles/cls/image/good-cls-values-are-01-a42d66f2d0f42.svg){ .off-glb }

| Classificação       | Valor      |
| ------------------- | ---------- |
| Bom                 | ≤ 0.1      |
| Precisa de melhoria | 0.1 – 0.25 |
| Ruim                | > 0.25     |

**Meta Eitri (mais rigorosa — otimizada para o Eitri-App):**

| Classificação | Valor  |
| ------------- | ------ |
| Bom           | ≤ 0.05 |
| Ruim          | > 0.1  |

**Por que importa:** Deslocamentos inesperados fazem o usuário perder o ponto de leitura, tocar em botões errados ou realizar ações indesejadas (ex: confirmar uma compra por engano). Especialmente crítico no Eitri-App, onde os alvos de toque são menores.

---

## FCP — First Contentful Paint

**O que mede:** Tempo desde o início da navegação até que qualquer conteúdo (texto, imagem, SVG, canvas não-branco) seja renderizado pela primeira vez na tela. É o sinal mais precoce de que a página está respondendo.

![Exemplo de linha do tempo do FCP](https://web.dev/static/articles/fcp/image/fcp-timeline-googlecom.png){ .off-glb }

**Limites (Web Vitals oficiais):**

![Gráfico de limites do FCP](https://web.dev/static/articles/fcp/image/good-fcp-values-are-18-s-421f9e1a2cc56.svg){ .off-glb }

| Classificação       | Valor         |
| ------------------- | ------------- |
| Bom                 | ≤ 1.8 s       |
| Precisa de melhoria | 1.8 s – 3.0 s |
| Ruim                | > 3.0 s       |

**Meta Eitri (mais rigorosa — otimizada para o Eitri-App):**

| Classificação | Valor     |
| ------------- | --------- |
| Bom           | ≤ 800 ms  |
| Ruim          | > 1800 ms |

**Por que importa:** O FCP é a primeira confirmação visual do usuário de que algo está acontecendo. Um FCP lento aumenta o tempo de espera percebido e a taxa de abandono, mesmo que a página venha a carregar completamente.

---

## LCP — Largest Contentful Paint

**O que mede:** Tempo de renderização do maior elemento visível no viewport (imagem, bloco de texto, poster de vídeo). Marca o momento em que o conteúdo principal da página provavelmente foi carregado.

**Exemplos reais de elementos LCP em diferentes sites:**

![Exemplo de LCP — CNN](https://web.dev/static/articles/lcp/image/largest-contentful-paint-fc43128e011aa.png){ .off-glb }
![Exemplo de LCP — TechCrunch](https://web.dev/static/articles/lcp/image/largest-contentful-paint-3713e2f14970a.png){ .off-glb }

**Elementos considerados:**

- `<img>` (incluindo o primeiro frame de imagens animadas)
- `<image>` dentro de `<svg>`
- `<video>` (poster ou primeiro frame, o que vier antes)
- Elementos com CSS `background-image: url()`
- Elementos em bloco com conteúdo de texto

**Limites (Web Vitals oficiais):**

![Gráfico de limites do LCP](https://web.dev/static/articles/lcp/image/good-lcp-values-are-25-s-28836be83d1aa.svg){ .off-glb }

| Classificação       | Valor         |
| ------------------- | ------------- |
| Bom                 | ≤ 2.5 s       |
| Precisa de melhoria | 2.5 s – 4.0 s |
| Ruim                | > 4.0 s       |

**Meta Eitri (mais rigorosa — otimizada para o Eitri-App):**

| Classificação | Valor     |
| ------------- | --------- |
| Bom           | ≤ 1000 ms |
| Ruim          | > 2500 ms |

**Por que importa:** Um LCP rápido transmite ao usuário que a página é útil e está pronta para interação. Possui correlação direta com a performance de carregamento percebida e é o Core Web Vital de maior impacto na retenção de usuários.

---

## LOAD — Evento de Carregamento da Página

**O que mede:** Tempo (em ms) desde o início da navegação até o disparo do evento `load` pelo aplicativo. Indica que todos os recursos síncronos (scripts, folhas de estilo, imagens referenciadas no JSX) terminaram de carregar.

> Esta é uma **métrica de temporização de navegação**, não um Core Web Vital. É capturada para fins de diagnóstico — um `load` lento combinado com um `LCP` rápido pode indicar recursos diferidos pesados.

---

## Score (0–100)

O score é um número ponderado único que resume as três métricas CWV capturadas. Segue uma **escala logarítmica** alinhada ao modelo de pontuação do Lighthouse, onde a relação entre o valor bruto da métrica e o score é não-linear — melhorias têm mais impacto quanto mais próximos os valores já estiverem do limiar "bom".

**Pesos:**

| Métrica | Peso |
| ------- | ---- |
| LCP     | 35%  |
| CLS     | 35%  |
| FCP     | 30%  |

**Fórmula por métrica:**

```
metricScore = (log(ruim) - log(valor)) / (log(ruim) - log(bom))
              limitado a [0, 1] × 100
```

Métricas não capturadas são excluídas da média ponderada, com os pesos restantes renormalizados automaticamente.

**Score final:**

```
score = round(Σ(metricScore × peso) / Σ(peso))
```

---

## Rating

| Rating              | Faixa de score | Significado                                                |
| ------------------- | -------------- | ---------------------------------------------------------- |
| `good`              | ≥ 90           | App atinge as metas de alta performance                    |
| `needs-improvement` | 50 – 89        | Problemas perceptíveis que afetam a experiência do usuário |
| `poor`              | < 50           | Problemas significativos de performance                    |
