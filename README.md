# Landing Page — Oficina de Percussão do Bloco do Caramuela

Landing page independente dedicada à **Oficina de Percussão do Bloco do Caramuela** (Fundição Progresso, Lapa — Rio de Janeiro).

> Projeto totalmente separado do site raiz (`caramuela-site`). Nenhuma alteração foi feita no site principal.

## Estrutura do Projeto

- `index.html`: Estrutura semântica em HTML5 com metadados de SEO e Open Graph.
- `assets/css/style.css`: Design system responsivo em CSS puro com paleta oficial Caramuela (roxo noturno, verde agroecologia, laranja fogueira e creme algodão cru).
- `assets/js/main.js`: Navegação móvel acessível, explorador interativo dos 5 naipes (Zabumba, Triângulo, Caixa, Ganzá e Pandeiro) com síntese rítmica em Web Audio API, gerador de mensagem de pré-inscrição para o WhatsApp e FAQ em acordeão.
- `assets/images/`: Ativos visuais da oficina e logotipo oficial do Caramuela.

## Como Visualizar Localmente

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080` no navegador.
