async function verifyImageURL(image: string, topic: string) {
  if ((await fetch(image)).status !== 200) {
    return `https://via.placeholder.com/600x400/263238?text=${topic}`;
  }

  return image;
}

export { verifyImageURL };
