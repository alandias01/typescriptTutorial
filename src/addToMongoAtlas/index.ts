import mongoose, { Mongoose, Schema } from "mongoose";
const fs = require("fs");
const csv = require("csv-parser");
import {
  AST,
  InsertReplaceValue,
  Insert_Replace,
  Parser,
} from "node-sql-parser";

const user = process.env.MONGOATLAS_USER;
const pw = process.env.MONGOATLAS_PASSWORD;
const db = process.env.MONGOATLAS_DB;
const mongoAtlasConnectionString = `mongodb+srv://${user}:${pw}@cluster0-yznr0.mongodb.net/${db}?retryWrites=true&w=majority`;

const connOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoAtlasConnection = mongoose.createConnection(
  mongoAtlasConnectionString,
  connOptions
);

mongoAtlasConnection.on("connected", () => console.log("Connected to atlas"));

mongoAtlasConnection.catch((error) => {
  console.log("mongoAtlasConnection error");
  console.log(error);
});

/************************** START *******************************/

//ReadFilegreList(mongoAtlasConnection);
//ReadFilegre(mongoAtlasConnection);
//CreateUserListsFromListsAndGre(mongoAtlasConnection);

/************************** START END****************************/

function testfunc() {
  try {
    console.log("entered testfunc properly");
  } catch (error) {
    console.log("Error in testfunc");
    console.log(error);
  }
}

/************************** Use for Stock************************/

function InsertStockPrices() {
  const stockSchema = new Schema({
    Symbol: { type: String },
    Name: { type: String },
    Sector: { type: String },
    Price: { type: String },
    "Price/Earnings": { type: String },
    "Dividend Yield": { type: String },
    "Earnings/Share": { type: String },
    "52 Week Low": { type: String },
    "52 Week High": { type: String },
    "Market Cap": { type: String },
    EBITDA: { type: String },
    "Price/Sales": { type: String },
    "Price/Book": { type: String },
    "SEC Filings": { type: String },
  });

  const stockModel = mongoose.model("stock", stockSchema);

  fs.createReadStream("./constituents-financials.csv")
    .pipe(csv())
    .on("data", async (data: any) => {
      try {
        const instance = new stockModel(data);
        const result = await instance.save();
      } catch (error) {
        console.log(error);
      }
    })
    .on("end", () => {
      console.log("done");
    });
}
/************************** Use for Stock END********************/

/************************** Use for gre**************************/

function GetGreWordSchema() {
  const greWordSchema = new Schema({
    word: { type: String },
    definition: { type: String },
    type: { type: String },
  });

  return greWordSchema;
}

function ReadFilegre(mongoConn: mongoose.Connection) {
  try {
    let rawdata = fs.readFileSync("./src/addToMongoAtlas/grewords.json");
    let greWordParsed = JSON.parse(rawdata);

    const greWordSchema = GetGreWordSchema();

    const greWordModel = mongoConn.model("word", greWordSchema);

    let promiseList: Promise<mongoose.Document>[] = [];
    greWordParsed.forEach((x: any) => {
      //console.log(x);
      const instance = new greWordModel(x);
      promiseList.push(instance.save());
    });

    Promise.all(promiseList)
      .then((x) => {
        console.log("All data inserted");
      })
      .catch((error) => {
        console.log("Error inserting data");
      });
  } catch (error) {
    console.log("Error in ReadFilegre");
    console.log(error);
  }
}

function GetGreListSchema() {
  const greListSchema = new Schema({
    email: { type: String },
    list: { type: String },
    word: { type: String },
  });

  return greListSchema;
}

function ReadFilegreList(mongoConn: mongoose.Connection) {
  try {
    const fileUrl = "./src/addToMongoAtlas/grelist.sql";
    const rawdata: string = fs.readFileSync(fileUrl, "utf8");

    const parser = new Parser();
    const [astFirst] = parser.astify(rawdata) as AST[];
    const ast = astFirst as Insert_Replace;

    // console.log(ast);
    // ast.values.forEach((x) => {
    //   console.log(x);
    //   x.value.forEach((listItem: InsertReplaceValue) => {
    //     console.log(listItem.value);
    //   });
    // });

    const greListSchema = GetGreListSchema();

    const greListModel = mongoConn.model("lists", greListSchema);

    let promiseList: Promise<mongoose.Document>[] = [];
    ast.values.forEach((x) => {
      const listObject: InsertReplaceValue[] = x.value;

      const [email, list, word] = listObject;
      //console.log(`email:${email.value} list:${list.value} word:${word.value}`);
      const data = { email: email.value, list: list.value, word: word.value };
      const instance = new greListModel(data);
      promiseList.push(instance.save());
    });

    Promise.all(promiseList)
      .then((x) => {
        console.log("All data inserted");
      })
      .catch((error) => {
        console.log("Error inserting data");
      });
  } catch (error) {
    console.log("Error in ReadFilegreList");
    console.log(error);
  }
}

function GetGreUserListSchema() {
  const greUserListSchema = new Schema({
    email: { type: String },
    list: { type: String },
    word: { type: String },
    definition: { type: String },
    type: { type: String },
  });

  return greUserListSchema;
}

interface IGreList extends mongoose.Document {
  email: string;
  list: string;
  word: string;
}
interface IGreWord extends mongoose.Document {
  word: string;
  definition: string;
  type: string;
}

async function CreateUserLists(mongoConn: mongoose.Connection) {
  try {
    const greListSchema = GetGreListSchema();
    const greWordSchema = GetGreWordSchema();
    const greUserListSchema = GetGreUserListSchema();

    const greListModel = mongoConn.model<IGreList>("lists", greListSchema);
    const greWordModel = mongoConn.model<IGreWord>("words", greWordSchema);
    const greUserListModel = mongoConn.model("userlists", greUserListSchema);

    const greLists = await greListModel.find({});

    const grelistsOnlyWords = greLists.map((x) => x.word);

    const greWords = await greWordModel.find({
      word: { $in: grelistsOnlyWords },
    });

    const grewordsOnlyWords = greWords.map((x) => x.word);

    let difference = grelistsOnlyWords.filter(
      (x) => !grewordsOnlyWords.includes(x)
    );
    console.log(difference);

    let promiseList: Promise<mongoose.Document>[] = [];

    greLists.forEach((x: IGreList) => {
      const wordFound = greWords.find((y) => x.word === y.word);
      if (!wordFound) {
        console.log(`Could not find ${x.word}`);
      } else {
        let userListObject = {
          email: x.email,
          list: x.list,
          word: x.word,
          definition: wordFound.definition,
          type: wordFound.type,
        };

        const instane = new greUserListModel(userListObject);
        promiseList.push(instane.save());
      }
    });

    Promise.all(promiseList)
      .then((x) => {
        console.log("All data inserted");
      })
      .catch((error) => {
        console.log("Error inserting data");
      });
  } catch (error) {}
}

//We have an sql insert statement for list items that we want to deconstruct into objects
function parsesql() {
  try {
    const sql =
      "INSERT INTO lists (email, list, word) VALUES ('a@a.com','frankenstein','abhorrence'),('a@a.com','frankenstein','abode')";
    const parser = new Parser();
    const ast = parser.astify(sql) as Insert_Replace;
    console.log(ast);
    ast.values.forEach((x: InsertReplaceValue) => {
      console.log(x.value);
      x.value.forEach((listItem: InsertReplaceValue) => {
        console.log(listItem.value);
      });
    });
  } catch (error) {
    console.log("There was an error");
    console.log(error);
  }
}

/************************** Use for gre END**********************/
