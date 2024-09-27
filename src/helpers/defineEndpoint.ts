export function defineEndpoint(topic: string): string {
  switch (topic) {
    case 'tech':
      return 'http://tecnologia.uol.com.br/ultnot/index.xml'
      break
    case 'sports':
      return 'http://rss.esporte.uol.com.br/ultimas/index.xml'
      break
    case 'games':
      return 'http://rss.uol.com.br/feed/jogos.xml'
      break
    case 'music':
      return 'http://musica.uol.com.br/ultnot/index.xml'
      break
    case 'cars':
      return 'http://rss.carros.uol.com.br/ultnot/index.xml'
      break
    case 'economy':
      return 'http://rss.uol.com.br/feed/economia.xml'
      break
    case 'cinema':
      return 'http://cinema.uol.com.br/ultnot/index.xml'
      break
    default:
      return 'http://rss.home.uol.com.br/index.xml'
      break
  }
}
