#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// const options = yargs
//   .usage("Usage: -n <name>")
//   .option("n", {
//     alias: "name",
//     describe: "Your name",
//     type: "string",
//     demandOption: true,
//   })
//   .option("s", {
//     alias: "search",
//     describe: "Search term",
//     type: "string",
//   }).argv;

const greeting = `Hello you can view your tickets here!`;
console.log(greeting);

var config = {
  method: "get",
  url: "https://zccstudentsnov2021.zendesk.com/api/v2/tickets.json",
  headers: {
    Authorization: process.env.AUTHORIZATION,
    Cookie: process.env.COOKIE,
  },
};

axios(config)
  .then(function (response) {
    console.log(response.data.tickets);
  })
  .catch(function (error) {
    console.log(error);
  });
