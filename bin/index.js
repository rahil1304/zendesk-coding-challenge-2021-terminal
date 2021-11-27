#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const dotenv = require("dotenv");
const _ = require("underscore");
const chalk = require("chalk");
const boxen = require("boxen");
const moment = require("moment");
const prompt = require("prompt-sync")();

const { messageGreeting } = require("./greeting.js");

dotenv.config();

let config = {
  method: "get",
  url: "https://zccstudentsnov2021.zendesk.com/api/v2/tickets.json",
  headers: {
    Authorization: process.env.AUTHORIZATION,
    Cookie: process.env.COOKIE,
  },
};

let configFetchEachTicket = {
  method: "get",
  // url: `https://zccstudentsnov2021.zendesk.com/api/v2/tickets/${id}.json`,
  headers: {
    Authorization: process.env.AUTHORIZATION,
    Cookie: process.env.COOKIE,
  },
};

let tickets = [];

function displayGreetingMessage() {
  console.log(messageGreeting);
}

function createNewTickets(allTickets) {
  // Ticket object to create each new individual ticket
  function Ticket(id, subject, description, date, status) {
    this.id = id;
    this.subject = subject;
    this.description = description;
    this.date = date;
    this.status = status;
  }

  _.each(allTickets, function (ticket) {
    tickets.push(
      new Ticket(
        ticket.id,
        ticket.subject,
        ticket.description?.substring(0, 20),
        moment(ticket.created_at).format("DD MMM YYYY"),
        ticket.status
      )
    );
  });
  return allTickets;
}

function getTicketsAPI(config, tickets) {
  let paginationIndex = 0;
  displayGreetingMessage();

  // API call to GET all tickets
  axios(config)
    .then(function (response) {
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

        paginationIndex = prompt(
          "Please enter the page of the tickets you would like to visit: "
        );
        console.log(`You are now viewing ${paginationIndex}`);
      }
      allTickets = response.data.tickets;
      paginatedTickets = allTickets.slice(
        paginationIndex * 25,
        paginationIndex * 25 + 25
      );
      return Promise.resolve(paginatedTickets);
    })
    .then((paginatedTickets) => {
      paginatedTickets = createNewTickets(paginatedTickets);
      console.table(tickets);
      return Promise.resolve(tickets);
    })
    .then((tickets) => {
      id = prompt(
        `Please enter the id of the ticket you want to view in detail: `
      );

      // API call to GET ticket from id
      configFetchEachTicket.url = `https://zccstudentsnov2021.zendesk.com/api/v2/tickets/${id}.json`;
      return axios(configFetchEachTicket);
    })
    .then((response) => {
      let ticket = response.data.ticket;
      console.log(`<------------------------------------>`);
      console.log(`These are the details of Ticket ${ticket.id}!`);
      console.log(`Subject: ${ticket.subject}`);
      console.log(`Description: ${ticket.description}`);
      console.log(`Date: ${moment(ticket.created_at).format("DD MMM YYYY")}`);
      console.log(`Status: ${ticket.status}`);
      console.log(`<------------------------------------>`);
      return Promise.resolve();
    })
    .then(() => {
      console.log("THANK YOU FOR VIEWING THE TICKETS");
      console.log(
        "IF YOU WANT TO VIEW THE TICKETS AGAIN, type 'run' and hit enter"
      );
      return Promise.resolve();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getTicketsAPI(config, tickets);

module.exports = { createNewTickets, getTicketsAPI, config };
