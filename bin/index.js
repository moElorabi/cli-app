#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const csv = require("csv");

const options = yargs
  .usage("Usage: -f <file>, -c <column>, -s <search>")
  .option("f", {
    alias: "file",
    describe: "file name",
    type: "string",
    demandOption: true,
  })
  .option("c", {
    alias: "column",
    describe: "column",
    type: "number",
  })
  .option("s", {
    alias: "search",
    describe: "search key",
    type: "string",
  }).argv;

//   "assets/csv-cli.csv"

fs.createReadStream(`${escape(options.file)}`).pipe(
  csv
    .parse({ columns: false, trim: true }, function (err, records) {
      const row = records.map((element) => {
        return element[escape(options.column)];
      });
      if (row.includes(escape(options.search))) {
        console.log(records[row.indexOf(escape(options.search))].toString());
      } else {
        console.log("not found");
      }
    })
    .on("error", (e) => {
      console.error("error" + e);
    })
);
