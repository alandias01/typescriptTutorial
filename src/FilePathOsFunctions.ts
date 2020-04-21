import fs, { ReadStream } from "fs";
import path from "path";
import readline, { ReadLineOptions } from "readline";
import stream from "stream";
import os from "os";

export class Files {
  constructor() {
    this.paths();
    this.reading();
  }

  out = (x: any) => x && console.log(x);
  myfile: string = path.join(__dirname, "testfile.txt");

  paths = () => {
    this.out("__dirname: " + __dirname);
    this.out("__dirname up one: " + path.join(__dirname, "../"));
    this.out("path.dirname: " + path.dirname(this.myfile));
    this.out("path.basename: " + path.basename(this.myfile));
    this.out("path.extname: " + path.extname(this.myfile));
  };

  reading = () => {
    fs.readdir(__dirname, (e, d) => d.forEach((x) => this.out(x)));
    //fs.readFile(this.myfile, "utf-8", (e, d) => this.out(d));

    //Read file by line by looking for line breaks
    const allDataInFile = fs.readFileSync(this.myfile, "utf-8");
    const lines = allDataInFile.split(/\r?\n/);
    lines.forEach((x) => this.out("New Line: " + x));

    //Read file using a stream where event gets raised on new line.  Uses less memory

    const readLineOption: ReadLineOptions = {
      input: fs.createReadStream(this.myfile),
      output: process.stdout,
      terminal: false,
    };
    const readLineInterface = readline.createInterface(readLineOption);
    readLineInterface.on("line", (line) => {
      console.log("New line stream: " + line);
    });

    //There is also an npm package to read lines, line-reader
  };

  streams = () => {
    const readableStream = new stream.Readable();
    readableStream.push("a");
  };
}
