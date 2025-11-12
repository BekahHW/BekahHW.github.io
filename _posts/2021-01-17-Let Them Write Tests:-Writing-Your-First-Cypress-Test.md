---
layout: post
title: "Let Them Write Tests: Writing Your First Cypress Test"
date: 2021-01-17
tags: [Technical, Testing]
---

_This is a continuation of [this post](https://dev.to/bekahhw/let-them-write-tests-an-argument-for-cypress-19o2)_

I like writing tests. I like the structure. I like when they find bugs. I even like when they give me nightmares. But I think I like them most because they’re accessible and getting Cypress setup is quick and painless.

I’ve already made my case for why you should write tests. Now I’m going to take you through getting Cypress up and running and writing your first test.

In your terminal:
Cd into your project path: `cd /your_project/path`

For example, I might have a project called coding-blog in my Project folder. So when I open my terminal, I put in: `cd Project/coding-blog`

(Capitalization doesn’t matter here, but spelling and order do.)

Now we’re ready to get it installed. (For more detailed instructions, [the docs](https://docs.cypress.io/guides/getting-started/installing-cypress.html#npm-install) are the place to be.) For less detailed instructions: In your terminal put `npm install cypress` (if you’re using npm). If you’re using yarn, type: `yarn add cypress`. It shouldn’t take that long to install, but while you’re waiting I recommend checking out the [Cypress docs](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell ), because I can guarantee you’ll be spending quality time there. 

Once it’s all done installing, you’re ready to explore some folders. You’ll notice in your file directory that you now have a Cypress folder. In that folder, you’ll find fixtures, integration, plugins, and support. You’ll also notice that you have a cypress.json file in your file structure.

Let’s start there. You’ll see that you can customize this. For this go-round, we’re just going to use the localhost address for the baseUrl that you’ll be using to test. 

`{
  "baseUrl": "http://localhost:3000/”
}`

Ok. We’re getting closer. Now open your Cypress folder, and click on integration. This is where we’ll write our first tests.

Now we need to figure out how to write the tests. Let’s pretend we’re testing a new user form. The file we’re testing is called NewUser.js, so we’ll create our new file with the name newUser.js in the Cypress/integration folder.  

There are two main pieces of a Cypress test. First, an example. Then the explanation. 
```
describe('new user form', () => {
  it('displays form validation', () => {
    cy.visit('/users/new')
    cy.get('#first_name').type('Bekah')    
    cy.get('#first_name').should('have.value', 'Bekah', 'be.visible')
  })
})
```
### Explanation
The test is looking for an input with the id “first_name.” It finds the input, types in the name and then checks that the name is visible in the input. But what are these sections?

#### Describe 
Has two arguments: a string (“subject”)--in this case “new user form” and the callback (“it”) that the runs the code

#### It
This block tells what to expect and checks for the outcome. Also takes a callback (“verb”)--in this case “displays the form”--and checks the assertion-> should have a value and be visible.

Each “it” block is a test. You can include multiple it blocks in a describe. For example, you might want to test validation on the form. If the user tries to submit without entering their name, an error appears on the screen. That should have it’s own “it” block.

How do you know what to test? Well, that’s another post. But you want to be sure that users can use your software. So start there.
To run the test, you can either open it in the testrunner, which runs in the browser and lets you actually see the action happening, or you can run it headlessly with the command `cypress run`.
To run the command in your terminal, you’ll either start with yarn or npm, depending on which your project uses and then the appropriate command. So in this case, I would run `yarn cypress open`. 
The test runner would open, and then I would select the file I want to test and watch the tests run.

Cool, right? And the nice thing about tests is if something isn’t working or if it breaks, you know right away. 
