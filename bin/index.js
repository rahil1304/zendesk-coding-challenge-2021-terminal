#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const dotenv = require("dotenv");
const _ = require("underscore");
const chalk = require("chalk");
const boxen = require("boxen");
const moment = require("moment");

const { messageGreeting } = require("./greeting.js");

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

var config = {
  method: "get",
  url: "https://zccstudentsnov2021.zendesk.com/api/v2/tickets.json",
  headers: {
    Authorization: process.env.AUTHORIZATION,
    Cookie: process.env.COOKIE,
  },
};
let tickets = [];

function displayGreetingMessage() {
  console.log(messageGreeting);
}

function getTicketsAPI(config, tickets) {
  displayGreetingMessage();
  axios(config)
    .then(function (response) {
      let paginationIndex = 0;
      if (!response) {
        return Promise.reject(
          "The Zendesk API is currently unavailable, please check again later."
        );
      }

      console.log(
        `There are a total of ${response.data.tickets.length} tickets`
      );
      if (response.data.tickets.length >= 25) {
        console.log(`Only 25 tickets can be displayed on the screen!`);

        const prompt = require("prompt-sync")();

        paginationIndex = prompt(
          "Please enter the page of the tickets you would like to visit: "
        );
        console.log(`You are now viewing ${paginationIndex}`);
      }
      allTickets = response.data.tickets;
      allTickets = allTickets.slice(
        paginationIndex * 25,
        paginationIndex * 25 + 25
      );
      return Promise.resolve(allTickets);
    })
    .then((allTickets) => {
      // Ticket object to create each new individual ticket
      function Ticket(id, subject, description, date, status) {
        this.id = id;
        this.subject = subject;
        this.description = description;
        this.date = date;
        this.status = status;
      }

      _.each(allTickets, function (ticket) {
        //   console.log(ticket);
        tickets.push(
          new Ticket(
            ticket.id,
            ticket.subject,
            ticket.description.substring(0, 20),
            moment(ticket.created_at).format("DD MMM YYYY"),
            ticket.status
          )
        );
      });
      console.table(tickets);
      return Promise.resolve(tickets);
    })
    .then((tickets) => {
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
}

getTicketsAPI(config, tickets);

module.exports = { getTicketsAPI };
