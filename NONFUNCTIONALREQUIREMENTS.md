### :golf: Requirements

- [x] Include a README with installation and usage instructions
- [x] The UI can be browser-based or CLI (see example output below). You will be judged equally for either choice.
<i>A: CLI based application </i>
- [x] The amount of data you display in the ticket list view and the single ticket view is up to you
- [x] How you format and display the ticket data is up to you, just ensure it is easy to read
- [x] The Ticket Viewer should handle the API being unavailable
```
 axios(config)
    .then(function (response) {
      if (!response) {
        return Promise.reject(
          "The Zendesk API is currently unavailable, please check again later."
        );
      }
      ...
```
- [x] We need to see you write some unit tests for your application in a standard unit testing framework for your language of choice
<i>A: Unit tests are in the ```test``` folder</i>