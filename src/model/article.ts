class Article {
  constructor(
    id: string,
    title: string,
    topic: string,
    headline: string,
    publishedAt: Date,
    source: string,
    url: string
  ) {
    this.id = id;
    this.title = title;
    this.topic = topic;
    this.headline = headline;
    this.publishedAt = publishedAt;
    this.source = source;
    this.url = url;
  }

  id: string;
  title: string;
  topic: string;
  headline: string;
  publishedAt: Date;
  source: string;
  url: string;
}

export { Article };
