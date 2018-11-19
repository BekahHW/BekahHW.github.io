---
layout: post
date: 2018-11-19
title: Let's do some chores: A Sinatra Project
---

For years, when I was teaching college English, I would give students an assignment that had general guidelines and expectations, but they would need to come up with a topic. There were always tears. How could I expect them to come up with their own topic?! It wasn’t fair! Now that I was a student again, I was facing that blank screen, wondering how on earth I would come up with a topic. I was given the general guidelines to create a CRUD, MVC app using Sinatra, and t should track something that’s important to me.

After some brainstorming (restaurants that accommodate food allergies, my books by genre, etc.), I decided the best idea would be to be able to assign my kids chores. I could make it an Alexa skill, and then they could just ask Alexa which chores they had today. Boom! Now my life is so much easier. (The Alexa skill is outside of the scope of the project, but the initial setup in Sinatra both fulfills the requirements and could be modified to become an Alexa skill.)

It’s always a good idea to start with wireframing--get a good idea of what you want and the order of appearance. It’s ok if this changes during the course of the project, but go back to your wireframe to keep things straight. (Trust me, I learned the hard way.)

Like my students, I had a hard time with the blank screen, but lucky for me, I watched a video on the corneal gem and started there. Corneal generates a template with built in basic CSS. One of the coolest parts, I’d later find out is that Corneal [was created by fellow Flatiron School students](https://blog.yechiel.me/of-scaffolds-and-gems-140bdbe2e005). So bam, I had a working structure for my project, and suddenly it felt less intimidating.

The next step was to define my associations in my models:
- The User would have_many :family_members
- The Family_member would have_many :chores and belong_to a :user
- The Chores would belong_to a :family_member

After the associations are clear and the models are set up, it’s easy to get your databases set up as well. Here are a couple of important things to remember before you jump into it:
- You can’t use the word “type” as one of your values. It’s a reserved word.
- Foreign keys aren’t automatically inserted if you have your models set up.

Once that was sorted out, I was ready for the views and controllers. I knew each would need a new, edit, and show file, and the user would need a login page as well. (And yes, the user does have the ability to delete family members. So in case you just need some catharsis…)

To login, the user would need a username and a password. To protect the user, I used the bcrypt gem to protect the password, and I enabled sessions in the Application Controller to allow the user to login and logout and to store the information for each user.

As I worked on my controller, I knew it was important that the only way someone should have access to the information was if they were logged in. I developed a helper method just for that.

  ```
  def redirect_if_not_logged_in
      if !logged_in?
        redirect "/users/login?error=Please log in first"
      end
    end
    ```

Logistically, the program looks like this: A user logs in. Once the login has been validated, the user is taken to a new family member page, a simple form that asks for the family member’s name. Once a name is created, the user is taken to a show page that gives the option as three forms to delete, assign chores, or create a new family member. If the user clicks assign chore, the controller moves over to chores/new. This was the trickiest part. I wanted the user to be able to assign chores to the family members they created. However, I wanted one chore to be created and assigned to one family member. The best way to do this was using select, which was a little tricky, because I also needed the name to display on the next page. Here’s how I did it:
```
  <p><label>Who does this chore belong to?</label> </p>

  <select name="chore[family_member_id]">

    <%  @family_member.each do |f| %>
    <option  id="<%= f.id%>" value="<%= f.id%>"><%= f.name %></option>
  <% end %>
</select>
```
The key was the select name. I had to connect the chore to the family_member_id, in order to be able to access the family_member’s name on the next page:
```
<%= @chore.family_member.name%>
```
In this step, the family_member is displayed along with the chore, the room in which the chore is done, the day of the week the chore is assigned, and the description of the chore.

The project went through three different iterations before the final path. Here are some tips on project building in Ruby that I learned along the way:

- Make binding.pry your friend. Honestly, I learn the most when I’m in a pry session. It helps me to see exactly what’s happening.
- Don’t panic when something isn’t working the way you intended it to. Take it back to the drawing board. Do some brainstorming to think things through before you jump into the problem. It’ll be easier in the long run.
- It’s ok to ask someone else to look at your code. I never would’ve figured out select if I hadn’t.
- If you think you’re done, DO NOT announce it on Twitter. You’ll only jinx it and have to go back and fix code three more times.

Happy coding!
