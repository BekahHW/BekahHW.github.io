---
layout: post
date: 2019-05-18
title: "Women of Trauma React Redux Project"
---
I’ve stuck with the same project idea for the last three projects for a couple of reasons: I have a hard time coming up with ideas, I’m passionate about this idea, I wanted to clearly compare the processes of coding in different languages and that seemed easiest by carrying the idea across Ruby and into JS. Here I am again developing Women of Trauma with a Rails backend and a React frontend.

Starting off, I decided to do my project as two separate repos, (the client side)[https://github.com/BekahHW/Women-of-Trauma-Client] and (the api side)[https://github.com/BekahHW/women-of-trauma-api]. I really enjoy working with React, but I’d love to try out React Native this summer. So having a separate backend would allow me to experiment with different frontend languages. I used a number of different tutorials, but I found (this one)[https://medium.com/@bruno_boehm/reactjs-ruby-on-rails-api-heroku-app-2645c93f0814] particularly helpful.

Setting up the Rails backend was pretty simple since I had worked through this project in Rails a couple of times already. This actually felt like a much simpler version of my Rails project since I didn’t create users or authentication, which were the biggest stumbling blocks in that project. What I do have are the basics, disorders (which are eight types of trauma with definitions seeded in the database) and narratives (which are stories created by the user with a title, tagline, selected disorder, and story).

On the frontend, I think I could make components forever. Confession: prior to this project, I still couldn’t grasp how components worked together. My mind was still in MVC mode with Ruby. Those are nice, organized boxes for me. React felt like chaos for a while. But now that I can see how the pieces fit together, how my home page can have a banner and a carousel of statistics about trauma and informational boxes in the areas below, I can better see the potential of stateless functional components.

My main containers--components that deal with the Redux state--were my NarrativeForm, Narrative component, and Disorder component. The Disorder component made a call to the Rails API to fetch the disorders that were in the seed file. The Narrative form allowed the user to create a narrative, that would post to the narrative route. I used thunk with the narratives and narrative form. Thunk is middleware that allows a function inside the action creator instead of a POJO. With Thunk, you can dispatch actions to loading state and to updating the store with returned data.

As a MVP, this app allows the user to find immediate help through the /getHelp route, post their own story, decrease the sense of isolation by reading the other narratives in the /narratives route, and learn more about each type of trauma through the /disorders route.
