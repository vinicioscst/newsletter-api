export function defineEndpoint(topic: string): string {
  switch (topic) {
    case 'brazil':
      return 'https://g1.globo.com/rss/g1/brasil/'
      break
    case 'tech-and-games':
      return 'https://g1.globo.com/rss/g1/tecnologia/'
      break
    case 'science-and-health':
      return 'https://g1.globo.com/rss/g1/ciencia-e-saude/'
      break
    case 'music':
      return 'https://g1.globo.com/rss/g1/musica/'
      break
    case 'economy':
      return 'https://g1.globo.com/rss/g1/economia/'
      break
    case 'education':
      return 'https://g1.globo.com/rss/g1/educacao/'
      break
    case 'pop-and-art':
      return 'https://g1.globo.com/rss/g1/pop-arte/'
      break
    default:
      return 'https://g1.globo.com/rss/g1/'
      break
  }
}
