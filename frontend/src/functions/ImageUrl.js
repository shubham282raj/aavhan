export function convertToDownloadLink(url) {
  // google drive links
  if (url.includes("drive.google.com")) {
    const match = url.match(
      /https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/
    );
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  // github links
  else if (url.includes("github.com")) {
    const githubRawUrl = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");
    return githubRawUrl;
  }
  // other links
  return url;
}
