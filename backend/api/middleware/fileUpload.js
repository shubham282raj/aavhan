import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./uploads");
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const uploadMulter = multer({ storage: storage });

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_TOKEN;

export const githubUpload = async (
  fileName,
  filePath,
  repoPath,
  branch = "aavhan"
) => {
  try {
    const buffer = fs.readFileSync(filePath);

    const body = {
      message: "Added file via GitHub API",
      content: buffer.toString("base64"),
      branch: branch,
    };

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}/${fileName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify(body),
      }
    );

    fs.unlinkSync(filePath);

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message);
    }

    return responseBody.content.download_url;
  } catch (error) {
    throw error;
  }
};
export const updateFile = async (
  fileName,
  filePath,
  repoPath,
  branch = "aavhan"
) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString("base64");

    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}/${fileName}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    let sha = null;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    const body = {
      message: "Updated file via GitHub API",
      content: content,
      branch: branch,
      sha: sha ? sha : undefined,
    };

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}/${fileName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify(body),
      }
    );

    fs.unlinkSync(filePath);

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody.message);
    }

    return responseBody.content.download_url;
  } catch (error) {
    throw error;
  }
};
