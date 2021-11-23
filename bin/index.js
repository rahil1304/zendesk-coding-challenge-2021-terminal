#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const dotenv = require("dotenv");
const _ = require("underscore");
const chalk = require("chalk");
const boxen = require("boxen");

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

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};
const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);

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
    console.log(`There are a totol of ${response.data.tickets.length} tickets`);
    let tickets = [];
    function Ticket(id, subject, description, date, status) {
      this.id = id;
      this.subject = subject;
      this.description = description;
      this.date = date;
      this.status = status;
    }

    _.each(response.data.tickets, function (ticket) {
      //   console.log(ticket);
      tickets.push(
        new Ticket(
          ticket.id,
          ticket.subject,
          ticket.description.substring(0, 20),
          ticket.created_at,
          ticket.status
        )
      );
    });
    console.table(tickets);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `Please enter the id of the ticket you want to view in detail: `,
      (id) => {
        console.log(`<------------------------------------>`);
        console.log(`These are the details of Ticket ${id}!`);
        console.log(`Subject: ${tickets[id - 1].subject}`);
        console.log(`Description: ${tickets[id - 1].description}`);
        console.log(`Date: ${tickets[id - 1].date}`);
        console.log(`Status: ${tickets[id - 1].status}`);
        console.log(`<------------------------------------>`);
        // console.log(`Subject: ${tickets[id - 1].subject}`);
        readline.close();
      }
    );
  })
  .catch(function (error) {
    console.log(error);
  });
