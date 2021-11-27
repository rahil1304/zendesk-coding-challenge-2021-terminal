const { createNewTickets, getTicketsAPI } = require("../bin/index");

// Empty Unit Test
test("On calling getTicketsAPI, the list of tickets should be displayed", () => {
  expect(createNewTickets([])).toEqual(expect.arrayContaining([]));
});

let exampleTicket = {
  requester_id: 1,
  assignee_id: 5,
  subject: "velit eiusmod reprehenderit officia cupidatat",
  description:
    "Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
  tags: ["est", "nisi", "incididunt"],
};

let config = {
  method: "get",
  url: "https://zccstudentsnov2021.zendesk.com/api/v2/tickets.json",
  headers: {
    Authorization: process.env.AUTHORIZATION,
    Cookie: process.env.COOKIE,
  },
};

// single ticket test
test("On calling getTicketsAPI, the list of tickets should be displayed", () => {
  expect(createNewTickets([exampleTicket])).toEqual(
    expect.arrayContaining([exampleTicket])
  );
});

// get tickets API test
test("On calling getTicketsAPI, the list of tickets should be displayed", () => {
  expect(getTicketsAPI(config, [exampleTicket])).toEqual(
    expect.arrayContaining([])
  );
});
