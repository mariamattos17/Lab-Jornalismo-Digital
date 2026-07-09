# O Papel da Base no Futebol Paraense

Reportagem long form — Lab. Jornalismo Digital (UFPA)

## Stack

- HTML5, CSS3, JavaScript puro
- JSON local (`data/paginas.json`)
- Cloudinary (mídias externas, quando aplicável)
- Netlify (deploy gratuito)
- GitHub

## Estrutura de pastas

```
├── index.html              # Introdução + capa
├── comeco-do-sonho.html     # Capítulo 1
├── a-rotina-invisivel.html  # Capítulo 2
├── o-futebol-como-esperanca.html
├── a-realidade.html
├── resultados-precoce.html
├── o-funil.html
├── o-olhar-da-comissao.html
├── saude-fisica-e-mental.html
├── da-base-para-o-profissional.html
├── quando-o-sonho-da-certo.html
├── os-talentos-que-ficaram.html
├── conclusao.html
├── assets/
│   ├── images/
│   └── videos/
├── css/
│   ├── reset.css           # Reset global
│   ├── chapter.css         # Estilos compartilhados (navbar, texto, mídia lateral, modal, responsivo)
│   ├── home.css            # Exclusivo da capa (index.html)
│   └── [pagina].css        # CSS exclusivo de cada capítulo (pode ficar vazio)
├── data/
│   └── paginas.json        # Mapa de páginas, títulos e CSS
└── js/
    ├── main.js             # Navegação, modal tela cheia, vídeos
    └── o-funil.js          # Animações da página Funil
```

## CSS de cada arquivo HTML

| Arquivo HTML | CSS vinculado |
|---|---|
| `index.html` | `reset.css` + `chapter.css` + `home.css` |
| `comeco-do-sonho.html` | `reset.css` + `chapter.css` + `comeco-do-sonho.css` |
| `a-rotina-invisivel.html` | `reset.css` + `chapter.css` + `a-rotina-invisivel.css` |
| `o-futebol-como-esperanca.html` | `reset.css` + `chapter.css` + `o-futebol-como-esperanca.css` |
| `a-realidade.html` | `reset.css` + `chapter.css` + `a-realidade.css` |
| `resultados-precoce.html` | `reset.css` + `chapter.css` + `resultados-precoce.css` |
| `o-funil.html` | `reset.css` + `chapter.css` + `o-funil.css` |
| `o-olhar-da-comissao.html` | `reset.css` + `chapter.css` + `o-olhar-da-comissao.css` |
| `saude-fisica-e-mental.html` | `reset.css` + `chapter.css` + `saude-fisica-e-mental.css` |
| `da-base-para-o-profissional.html` | `reset.css` + `chapter.css` + `da-base-para-o-profissional.css` |
| `quando-o-sonho-da-certo.html` | `reset.css` + `chapter.css` + `quando-o-sonho-da-certo.css` |
| `os-talentos-que-ficaram.html` | `reset.css` + `chapter.css` + `os-talentos-que-ficaram.css` |
| `conclusao.html` | `reset.css` + `chapter.css` + `conclusao.css` |

## Padrão editorial (modelo o-funil.html)

- Texto alinhado à esquerda, coluna editorial (~760px)
- Imagens e vídeos pequenos ao lado do parágrafo via `.media-row`
- Clique na imagem ou no vídeo abre modal em tela cheia
- Títulos grandes (`clamp(3rem, 5.3vw, 5rem)`) e lead com letra capitular
- Navbar fixa com scroll horizontal e menu hambúrguer no mobile

## Deploy (Netlify)

1. Suba o repositório no GitHub
2. Conecte ao Netlify (Build command vazio, Publish directory: `/`)
3. O site é estático — não precisa de build

chapter-navigation linha 