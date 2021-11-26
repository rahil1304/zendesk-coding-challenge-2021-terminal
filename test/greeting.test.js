const greeting = require("../bin/greeting");

test("On calling greeting, the greeting message should be displayed", () => {
  expect(greeting.displayGreeting()).toBe(
    "Hello! You can view your tickets here!"
  );
});
