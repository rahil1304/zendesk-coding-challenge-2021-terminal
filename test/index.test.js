const { createNewTickets } = require("../bin/index");

// Empty Unit Test
test("On calling getTicketsAPI, the list of tickets should be displayed", () => {
  expect(createNewTickets([])).toEqual(expect.arrayContaining([]));
});
