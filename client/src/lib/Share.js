export const shareTwitter = (text, url) => {
  const sendText = text;
  const sendUrl = url; // 전달할 URL
  window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
};
