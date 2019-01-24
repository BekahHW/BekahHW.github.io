---
layout: post
date: 2019-01-24
title: "Treating Trauma with Technology, Rails Style"
---
I have a love-hate relationship with my trauma. I hate it because of how it stopped my life for so long, how it prevented me from being myself, how it made me feel like I was stuck in this bubble of time while everyone else moved forward without me. I love it because had I not been through trauma, I wouldn't have discovered my love for coding. I love it because it's given me a purpose to share my story to and to help other people find healing through sharing theirs. So what better way to merge the two than my Rails project. Two things stood out in the treatment of trauma: telling your story and writing it down gives you control over the experience and can create catharsis and finding out you're not alone. Fun fact: The writing portion of this was inspired by [PEN America's Prison and Justice Writing Program](https://pen.org/prison-writing/]). The second thing I wanted to incorporate was community: those who have experienced trauma often feel alone and isolated. Allowing for users to see other people's stories can help them to realize they are not alone. So how did I approach this with code?

One of the hardest parts of the project was to create an MVP, because there are so many things I want to incorporate like messaging features, data maps, breakdowns of each disorder. To start, I created the models User, Treatment, Disorder, Therapist, and the join tables UserDisorder, UserTherapist, and UserDisorderTreatments. Not all of these are currently being used in the project, but will be in the future. For example, Therapists isn't being used, but will be to add therapists' information, whereas UserTherapist will house ratings for a particular users' experience with comments.

From a user's standpoint, I wanted them to be able to sign-in easily first. For this, I used both the Devise and Omniauth gems, and I created the Omniauth login through Github. Devise and Omniauth were not playing nicely together. Seriously, they were worse than my 2 and 4 year old in the car. I'm not sure if this is a GitHub issue, but one of the things that solved it for me was going into '/initializers/devise.rb', finding the Omniauth section, and adding the following:

```
config.omniauth :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'], scope: 'user:email'
```
Notice the scope. That wasn't included in any of the tutorials I looked at and it was essential for it to work.

Now that my user could log in, I needed somewhere for her to go. Because I wanted to emphasize the importance of Therapy, I started there. The user could go to a welcome page that gave some simple explanation and then create a therapist she would recommend. I created this attribute on the join table UserTherapist because I'd like to expand this page for a user to give personal experience with their therapist. Eventually, it will have a rating system, comments, and the ability to add a therapist from the therapist model.

There's a dropdown menu for the program on the navigation bar. Once the user logs in, it's populated with options. The most complex code I wrote came from the Disorder model. I really wanted to do a nested route, so I allowed the user to create a disorder and description and then I nested the narrative from UserDisorders on the form as well. This took a little coding gymnastics, but I came out with this:

```
<%= errors_for(@disorder) %>

<%= f.text_field :name, list: "disorders_autocomplete" %>
  <datalist id="disorders_autocomplete">
    <%Disorder.all.each do |d| %>
    <option value="<%= d.name %>">
      <% end %>
  </datalist>

  <%= f.text_area :description %>

  <label>Take Control of Your Story</label>
  <%= f.fields_for :user_disorders, @user_disorder do |ff| %>
  <%= ff.text_area :narrative, size: "80%x20%" %>

<br>
<% end %>

  <%= f.submit 'Submit', class: 'form-control' %>
  ```
This is a partial, so it's rendered on the disorders/new and disorders/edit pages. I also played around with Bootstrap for this project, so on those pages you'll see "bootstrap_form_for". The disorders_autocomplete allows the user to choose from disorders that have already been created or she can type a new one. The description can be the user's own experience with the disorder. And the nested part of the form comes with the narrative. Notice the size: "80%x20%". I wanted the user to feel like she could write a lot and give her the visibility to see what she was writing. This form size achieved that.

Each of the classes with submittable attributes has a new, index, show, and edit page. I have a scope method that orders the therapists by location. In order to do this, I had to create a capitalize_fields method in the UserTherapist model. If I didn't, it would order all the capitalized locations first and the uncapitalized second. It looks like this:

```
before_save :capitalize_fields

  def capitalize_fields
     self.location.capitalize!
  end
  ```

The interesting part about creating something that is totally my own, from scratch is you learn a lot both about coding and planning as you go. What I had initially planned on doing didn't quite work out because I added a couple of tables, and decided to go in a different direction in some places. What becomes most valuable at this point is taking a step back and revising the plan. You can quickly get into a rabbit hole.

The best part of this project was learning how technology can help me to help other people. For me, finding a passion project drove this process, it also was like driving 120mph down a main street. There was so much I wanted to do that I started going for it, and should've realized sooner that speeding was not the right way to approach this, even if this is something I'd like to develop.
