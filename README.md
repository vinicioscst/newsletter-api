# Newsletter (API)

<p align="center">
    <img src="https://img.shields.io/badge/Javascript-yellow?logo=javascript&logoColor=f5f5f5" alt="Linguagem">
    <img src="https://img.shields.io/badge/Node%2Ejs%2020%2E11%2E1-5FA04E?logo=Node%2Ejs&logoColor=f5f5f5" alt="Runtime">
    <img src="https://img.shields.io/badge/In%20Progress-blue" alt="Progresso">
</p>

Backend do [projeto Newsletter](https://github.com/vinicioscst/newsletter-vue).
A API utiliza a API do Gemini (IA desenvolvida pelo Google) para coletar as 15 notícias mais relevantes do dia no país.

## Rota

<details>
<summary>Solicitar notícias</summary>

#### `GET - /api/articles`

Essa é a rota que será utilizada para enviar o prompta ao Gemini. Lembre-se de que, ao clonar esse repositório, você precisa criar sua própria key da API do Gemini. [**Mais informações aqui**](https://ai.google.dev/).

Exemplo de retorno:

```javascript
{
  [
    {
      id: "57b68877-36e1-4659-8e18-54e609d2286f",
      title:
        "Festa em grande estilo com direito a vestido de noiva: como são os casamentos caninos na China",
      publishedAt: "Wed, 10 Jul 2024 13:45:39 -0000",
      source: "G1",
      url: "https://g1.globo.com/pop-arte/pets/noticia/2024/07/10/festa-em-grande-estilo-com-direito-a-vestido-de-noiva-como-sao-os-casamentos-caninos-na-china.ghtml",
      image:
        "https://s2-g1.glbimg.com/ypKWhotRcG49nFOPa-nDVRTtLpA=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/z/8/KlKa4DSmOia83mMv9GMw/dog4.jpg",
    },
    {
      id: "9c4b7776-15f0-4e33-926b-f705c4247982",
      title:
        "Novo protocolo de vacinação contra Covid-19 é adotado para atender grupos prioritários em Santarém",
      publishedAt: "Wed, 10 Jul 2024 13:44:34 -0000",
      source: "G1",
      url: "https://g1.globo.com/pa/santarem-regiao/noticia/2024/07/10/novo-protocolo-de-vacinacao-contra-covid-19-e-adotado-para-atender-grupos-prioritarios-em-santarem.ghtml",
      image:
        "https://s2-g1.glbimg.com/o-jeAF09JYS2OfH4vUUtPONARYs=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/M/T/Eb7GBUTaqy5RTYWYQjeA/000-9392ej.jpg",
    },
    {
      id: "6a267d29-1b87-42f8-a4b5-160c69a84811",
      title:
        "Grupo liderado por ex-presidente da Câmara de Muriaé que desviava dinheiro público é alvo de novos mandados",
      publishedAt: "Wed, 10 Jul 2024 13:43:55 -0000",
      source: "G1",
      url: "https://g1.globo.com/mg/zona-da-mata/noticia/2024/07/10/grupo-liderado-por-ex-presidente-da-camara-de-muriae-que-desviava-dinheiro-publico-e-alvo-de-novos-mandados.ghtml",
      image:
        "https://s2-g1.glbimg.com/dtDXaF9nSge1OFnelf-wMEeSTNM=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/F/Y/GlQWLOTxmWba4zxaRmOg/carlos-delfim.jpg",
    },
  ];
}
```

</details>
