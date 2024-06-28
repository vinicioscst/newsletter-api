import { UUID } from "crypto";

class Article {
  constructor(
    id: UUID,
    title: string,
    topic: string,
    headline: string,
    publishedAt: Date,
    source: string,
    url: string,
    image: string
  ) {
    this.id = id;
    this.title = title;
    this.topic = topic;
    this.headline = headline;
    this.publishedAt = publishedAt;
    this.source = source;
    this.url = url;
    this.image = image;
  }

  id: UUID;
  title: string;
  topic: string;
  headline: string;
  publishedAt: Date;
  source: string;
  url: string;
  image: string;
}

export { Article };
