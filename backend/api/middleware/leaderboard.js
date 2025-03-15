import User from "../models/user.js";
import fs from "fs";
import path from "path";
import { githubUpload, updateFile } from "./fileUpload.js";

export const updateLeaderboard = async () => {
  const users = await User.find({}).select("-password");

  let sheets = await fetch(
    "https://docs.google.com/spreadsheets/d/1XJYt561AIFlJ60Z6zxYgz7UlOZJfSRTYiLUhbMsYcXg/export?format=csv"
  );

  sheets = await sheets.text();
  sheets = sheets
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(","));

  const pointCol = sheets[0].indexOf("Points");

  const scoreList = [];
  users.forEach((user) => {
    let userPoints = 0;
    Object.keys(user.tasksCompleted).forEach((key) => {
      const rowIndex = sheets.findIndex((row) => row[0] == key);
      if (
        user.tasksCompleted[key].some(
          (submission) => submission.verified == "Verified"
        )
      ) {
        userPoints += Number(sheets[rowIndex][pointCol]);
      }
    });
    const listElement = {
      _id: user._id,
      name: user.name,
      college: user.college,
      points: userPoints,
    };
    scoreList.push(listElement);
  });
  const jsonString = JSON.stringify(scoreList, null, 2);

  await fs.writeFileSync("leaderboard.json", jsonString);

  await updateFile("leaderboard.json", "leaderboard.json", "leaderboard");
};
