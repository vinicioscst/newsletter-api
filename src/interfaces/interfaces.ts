interface IResponseArticle {
  title: string[];
  link: string[];
  guid: Guid[];
  description: string[];
  "media:content": MediaContent[];
  category: string[];
  pubDate: string[];
}

interface Guid {
  _: string;
  $: Permalink;
}

interface Permalink {
  isPermaLink: string;
}

interface MediaContent {
  $: ImageInfo;
}

interface ImageInfo {
  url: string;
  medium: string;
}

interface IError {
  error: string;
}

interface RequestQuery {
  topic: string;
}

export { IResponseArticle, IError, RequestQuery };
