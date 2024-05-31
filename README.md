# Newsletter (API)

<p align="center">
<img src="https://img.shields.io/badge/Javascript-yellow?logo=javascript&logoColor=f5f5f5" alt="Linguagem">
    <img src="https://img.shields.io/badge/Node%2Ejs%2020%2E11%2E1-5FA04E?logo=
Node%2Ejs&logoColor=f5f5f5" alt="Runtime">
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
      title:
        "Lula diz que Mourão 'não tem nada a ver com a vida real' e 'vive em outro planeta'",
      description:
        "Em entrevista à TV Globo, o presidente afirmou que o vice-presidente, general da reserva, não tem compromisso com os problemas do país e 'vive em outro planeta'.",
      publishedAt: "2023-10-27T14:00:00.000Z",
      source: "G1",
      url: "https://g1.globo.com/politica/noticia/2023/10/27/lula-diz-que-mourao-nao-tem-nada-a-ver-com-a-vida-real-e-vive-em-outro-planeta.ghtml",
      image:
        "https://g1.globo.com/dyna/images/2023/10/27/lula-e-mourao-durante-reuniao-ministerial-em-2023.jpg",
    },
    {
      title:
        "Bolsonaro diz que 'ainda não' tomou decisão sobre candidatura em 2026",
      description:
        "Em evento em São Paulo, o ex-presidente afirmou que 'ainda não' tomou decisão sobre uma eventual candidatura à Presidência da República em 2026 e que 'ainda está cedo' para isso.",
      publishedAt: "2023-10-27T13:00:00.000Z",
      source: "Folha de S.Paulo",
      url: "https://www1.folha.uol.com.br/poder/2023/10/bolsonaro-diz-que-ainda-nao-tomou-decisao-sobre-candidatura-em-2026.shtml",
      image:
        "https://www1.folha.uol.com.br/poder/2023/10/bolsonaro-diz-que-ainda-nao-tomou-decisao-sobre-candidatura-em-2026.shtml",
    },
    {
      title:
        "STF: Moraes mantém bloqueio de R$ 17 milhões de Bolsonaro por atos golpistas",
      description:
        "Ministro do Supremo Tribunal Federal (STF) negou o pedido da defesa do ex-presidente para desbloquear os valores que foram bloqueados em investigação sobre os atos golpistas de 8 de janeiro.",
      publishedAt: "2023-10-27T12:00:00.000Z",
      source: "O Globo",
      url: "https://oglobo.globo.com/brasil/stf-moraes-mantem-bloqueio-de-r-17-milhoes-de-bolsonaro-por-atos-golpistas-26331395",
      image:
        "https://s2.glbimg.com/5O1hG6yK04U9F6-24b16a6221f0-0-856-0-0/f=x160,y0,w856,h480/s=408x230/rs=1/e=s100/q=85/l=news/2023/10/27/26331395.jpg",
    },
    {
      title: "Governo Lula aprova novo marco para gás natural",
      description:
        "O novo marco legal para o gás natural foi aprovado pelo Conselho de Ministros nesta sexta-feira (27). O objetivo é estimular investimentos no setor, reduzir o preço do gás e aumentar a competitividade do Brasil no mercado global.",
      publishedAt: "2023-10-27T11:00:00.000Z",
      source: "Valor Econômico",
      url: "https://valor.globo.com/brasil/noticia/2023/10/27/governo-lula-aprova-novo-marco-para-gas-natural.ghtml",
      image: "https://valor.globo.com/dyna/images/2023/10/27/gas-natural-1.jpg",
    },
    {
      title: "Petrobras anuncia aumento de 5,7% no preço da gasolina",
      description:
        "A Petrobras anunciou nesta sexta-feira (27) um aumento de 5,7% no preço da gasolina nas refinarias. O reajuste entra em vigor a partir de sábado (28).",
      publishedAt: "2023-10-27T10:00:00.000Z",
      source: "Estadão",
      url: "https://www.estadao.com.br/noticias/economia/petrobras-anuncia-aumento-de-57-no-preco-da-gasolina-veja-os-novos-valores-2151485",
      image:
        "https://www.estadao.com.br/fotos/2023/10/27/1990576/710x473/foto-petrobras.jpg",
    },
    {
      title:
        "Ibovespa fecha em alta de 0,54%, impulsionado por ações de bancos e Vale",
      description:
        "O Ibovespa, principal índice da Bolsa de Valores de São Paulo, fechou em alta de 0,54% nesta sexta-feira (27), impulsionado por ações de bancos e Vale.",
      publishedAt: "2023-10-27T09:00:00.000Z",
      source: "Reuters",
      url: "https://www.reuters.com/article/brazil-stocks-idUSL1N37Q29D",
      image:
        "https://www.reuters.com/pf/resources/images/reuters-graphics/reuters-graphics-2022-12-16-brazil-stocks-idUSL1N37Q29D.jpg",
    },
    {
      title:
        "Real fecha a semana em alta contra o dólar, impulsionado por dados de inflação",
      description:
        "O real fechou a semana em alta contra o dólar, impulsionado por dados de inflação que mostraram que a inflação está sob controle.",
      publishedAt: "2023-10-27T08:00:00.000Z",
      source: "Bloomberg",
      url: "https://www.bloomberg.com/news/articles/2023-10-27/brazilian-real-extends-gains-as-inflation-data-buoys-currency",
      image:
        "https://assets.bwbx.io/images/users/iqj/2023-10-27/1106043_real_bloomberg_graphics-2_0_20231027112533.jpg",
    },
    {
      title: "Governo Lula lança programa para estimular o turismo no Brasil",
      description:
        "O programa 'Brasil + Turismo' foi lançado nesta sexta-feira (27) pelo governo Lula, com o objetivo de estimular o turismo no Brasil e gerar empregos no setor.",
      publishedAt: "2023-10-27T07:00:00.000Z",
      source: "Agência Brasil",
      url: "https://agenciabrasil.ebc.com.br/economia/noticia/2023-10-27/governo-lula-lanca-programa-para-estimular-o-turismo-no-brasil",
      image:
        "https://agenciabrasil.ebc.com.br/sites/default/files/styles/image_destaque_interna_ampla/public/2023-10/20231027_turismo_brasil_governo_lula_1.jpg?itok=s2iH7F-9",
    },
    {
      title:
        "Câmara aprova projeto que obriga empresas a oferecer plano de saúde para funcionários",
      description:
        "O projeto de lei, que foi aprovado pela Câmara dos Deputados nesta quinta-feira (26), obriga empresas com mais de 100 funcionários a oferecer plano de saúde para todos os seus empregados.",
      publishedAt: "2023-10-26T23:00:00.000Z",
      source: "UOL",
      url: "https://noticias.uol.com.br/politica/ultimas-noticias/2023/10/26/camara-aprova-projeto-que-obriga-empresas-a-oferecer-plano-de-saude-para-funcionarios.htm",
      image:
        "https://s2.glbimg.com/jZ97Xh1U4_f4c_XgQ8H858Y-A/e.glbimg.com/og/ed/f/original/2023/10/26/camara-aprova-projeto-que-obriga-empresas-a-oferecer-plano-de-saude-para-funcionarios.jpg",
    },
    {
      title: "Brasil registra 140.000 novos casos de dengue em uma semana",
      description:
        "Segundo o Ministério da Saúde, o número de casos de dengue no Brasil aumentou em 140.000 em uma semana, o que eleva o total para mais de 1,5 milhão de casos confirmados no país em 2023.",
      publishedAt: "2023-10-26T22:00:00.000Z",
      source: "CNN Brasil",
      url: "https://www.cnnbrasil.com.br/saude/brasil-registra-140-mil-novos-casos-de-dengue-em-uma-semana/",
      image:
        "https://www.cnnbrasil.com.br/media/2023/10/26/dengue-2023-brasil-20231026180950.jpg",
    },
    {
      title: "Governo Lula libera R$ 10 bilhões para obras de infraestrutura",
      description:
        "O governo Lula anunciou nesta quinta-feira (26) a liberação de R$ 10 bilhões para obras de infraestrutura em todo o país. Os recursos serão destinados para obras de rodovias, ferrovias, portos e aeroportos.",
      publishedAt: "2023-10-26T21:00:00.000Z",
      source: "Correio Braziliense",
      url: "https://www.correiobraziliense.com.br/brasil/2023/10/26/6211922-governo-lula-libera-r-10-bilhoes-para-obras-de-infraestrutura.html",
      image:
        "https://www.correiobraziliense.com.br/app/noticia/brasil/2023/10/26/internas_brasil,6211922/governo-lula-libera-r-10-bilhoes-para-obras-de-infraestrutura.shtml",
    },
    {
      title:
        "STF: Moraes decide sobre pedido de Bolsonaro para desbloquear R$ 17 milhões",
      description:
        "O ministro do Supremo Tribunal Federal (STF), Alexandre de Moraes, deve decidir nesta sexta-feira (27) sobre o pedido da defesa do ex-presidente Jair Bolsonaro para desbloquear R$ 17 milhões que foram bloqueados em investigação sobre os atos golpistas de 8 de janeiro.",
      publishedAt: "2023-10-26T20:00:00.000Z",
      source: "Metrópoles",
      url: "https://www.metropoles.com/brasil/stf-moraes-decide-sobre-pedido-de-bolsonaro-para-desbloquear-r-17-milhoes",
      image:
        "https://www.metropoles.com/wp-content/uploads/2023/10/bolsonaro-bloqueio-de-bens-stf-1.jpg",
    },
    {
      title:
        "Brasil conquista medalha de ouro no Mundial de Natação em Fukuoka",
      description:
        "O nadador brasileiro Guilherme Costa conquistou a medalha de ouro no Mundial de Natação em Fukuoka, no Japão, na prova dos 1500 metros livre.",
      publishedAt: "2023-10-26T19:00:00.000Z",
      source: "Terra",
      url: "https://www.terra.com.br/esportes/brasil-conquista-medalha-de-ouro-no-mundial-de-natacao-em-fukuoka,12116c4194258e53894f4713e421d73473q09p17.html",
      image:
        "https://www.terra.com.br/img/uploads/2023/10/26/6448790/gui-costa-ouro-1500m-mundial-de-natacao-2023-fukuoka-1.jpg",
    },
    {
      title: "Governo Lula cria programa para reduzir o preço dos alimentos",
      description:
        "O programa 'Alimentos + Brasil' foi criado pelo governo Lula com o objetivo de reduzir o preço dos alimentos para a população mais pobre. O programa inclui medidas como a redução de impostos sobre alimentos básicos e o aumento da produção de alimentos.",
      publishedAt: "2023-10-26T18:00:00.000Z",
      source: "O Estado de S. Paulo",
      url: "https://politica.estadao.com.br/noticias/geral,governo-lula-cria-programa-para-reduzir-o-preco-dos-alimentos,2151211",
      image:
        "https://www.estadao.com.br/fotos/2023/10/26/1989134/710x473/foto-lula.jpg",
    },
    {
      title:
        "Câmara aprova projeto que libera o uso de armas de fogo para caça",
      description:
        "O projeto de lei, que foi aprovado pela Câmara dos Deputados nesta quinta-feira (26), libera o uso de armas de fogo para caça em todo o país.",
      publishedAt: "2023-10-26T17:00:00.000Z",
      source: "R7",
      url: "https://noticias.r7.com/brasil/camara-aprova-projeto-que-libera-o-uso-de-armas-de-fogo-para-caca-20231026203107-502715.html",
      image:
        "https://s2.glbimg.com/b_a-N_Y6p7w3T3oFzH2kX_Z4=/0x0:600x338/984x0/smart/filters:strip_icc()/i.r7.com/images/1360x765/2023/10/26/1698251528790_644845b222649_cavador-de-ouro-2_1.jpg",
    },
  ];
}
```

</details>
