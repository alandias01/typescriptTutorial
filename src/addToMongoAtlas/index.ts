import mongoose, { Mongoose, Schema } from "mongoose";
const fs = require("fs");
const csv = require("csv-parser");

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

mongoose
  .connect(
    "mongodb+srv://Root:<password>@cluster0-yznr0.mongodb.net/portfolio?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(Start)
  .catch((err) => {
    console.log(err);
  });

function Start(connectionDetails: Mongoose) {
  const instance = new stockModel();
  ReadFile();
}

function ReadFile() {
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
