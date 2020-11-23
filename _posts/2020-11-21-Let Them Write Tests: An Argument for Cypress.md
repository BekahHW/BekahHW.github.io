---
layout: post
title: "Let Them Write Tests: An Argument for Cypress"
date: 2020-11-21
---

When I was learning to code, testing was covered a little bit, but I didn’t grasp the full awesomeness of what we test and why we test it. But I have been lucky enough--yes, I said lucky--to learn more about testing and dive into Testing Library and Cypress, but I’m just going to talk about Cypress here. Not only did I learn how to test, and strategies behind testing, but I also learned a lot about the codebase I was working in, how the components work together, how the user interacts with the program.

And this is a big win. These are things that new devs struggle with. Yes, I may have had a couple of nightmares about the tests I was writing. Yes, I may have been stuck in testing hell for a while. But learning these things helped me to gain confidence as a developer. Letting new devs write tests benefits everyone.

And Cypress is a pretty good place to start for your frontend needs.

And if you’re still not convinced that you should be writing E2E tests, let [Kent C. Dodds](https://kentcdodds.com/blog/confidently-shipping-code) convince you: “I write tests because they allow me to accomplish more than I could otherwise. I now have thousands of Kents in the form of automated tests telling me whether changes are breaking use cases.”

## What is Cypress

Cypress is An open source, JavaScript end-to-end (E2E) testing framework that bundles tools and libraries to get your tests up and running quickly. And one of the cool things about it is that it runs in the browser.

## Why is Cypress good for beginners?

It’s readable.

```
context("Login", () => {
  beforeEach(() => {
    cy.visit("localhost:8080/login");
  });
  it("finds and types email", () => {
    cy.get("#email")
      .type("leslieKnope@pawnee.gov")
      .should("have.value", "leslieKnope@pawnee.gov");
  })
```

Just looking at the test above, you get an idea of what’s happening. Before each test is run in this section, the testrunner visits the url that’s specified. The “it” block tells what to expect and checks for the outcome. Also takes a callback (“verb”) and checks the assertion.

As you keep reading, you see that it’s finding the input, typing, and checking that the value is there.

(And if you’re familiar with Testing Library, you can also add Cypress Testing library to leverage those commands as well--highly recommend.)

The testrunner.

When you run cypress open, the testrunner opens in the browser. The testrunner allows you to see exactly where each part of the test is happening and where it fails. You can see each step in the browser. So if we’re looking at the example above, you would see the email address being typed in the input. When you test a button click, you see that as the test runs. You see what you wrote.

And along with that, when your test fails, you see exactly where it fails and there are usually really great error messages that go along with the failure.

With the ease of setup--getting it up and running only takes a couple of minutes--the readability of tests, and the testrunner giving a really clear picture of what the tests are doing and how you’re interacting with your software, using Cypress to test your frontend shouldn’t be a hard decision.

And if you’re new to the devlife and you’re wondering what to learn next or to add to your project, this is a great place to start.
