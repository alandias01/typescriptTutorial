import fs from "fs";
import path from "path";
import os from "os";

export class Files {
  basic = () => {
    fs.readFile("newnodeproject.txt", "utf-8", (err, data) => {
      console.log(data);
    });
  };
}
