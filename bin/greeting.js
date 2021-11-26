const boxen = require("boxen");

const greeting = `Hello! You can view your tickets here!`;

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};
const messageGreeting = boxen(greeting, boxenOptions);

function displayGreeting() {
  return greeting;
}

module.exports = { messageGreeting, displayGreeting };
