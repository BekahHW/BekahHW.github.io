---
layout: post
title: "Git and Github, the Screenwriter's Version"
date: 2018-07-09
tags: [Technical, Learning]
---


I’ve had this dream for a while to write a collaborative screenplay. Not a screenplay with a partner. I’ve already done that with my brother a couple of times. A collaborative project would allow multiple writers, editors, and experts in different parts of the screenplay (character arc, dialogue, audience experience to work on the project). I know what you’re thinking, and yes, this could turn out to be a hodge podge, disastrous script. But hear me out. I think this could work if we understood it in the context of git and GitHub.

With my background in writing and the humanities, understanding git and GitHub in terms of my background makes the most sense for me.  What do git and GitHub do? How can I take my new journey into tech and merge it into the writing journey of the past? Not only is the explanation below just helpful for me to understand, it’s something I would love to try out, and this is what it would look like:

So first someone, well me because it’s my idea, would need to break down the project, create a general overview. Now, I can tell you from experience, breaking a screenplay isn’t exactly straightforward, and it’s not just going to be me saving Best Screenplay Ever every time I make a change. (I can’t tell you how many times I’ve named something Screenplay_final and then had to add screenplay_final_final and then continually mix up which version is really the final version.) When I start to create the story I might come to a point where I realize that, actually, my hero wouldn’t have done that in the beginning of the screenplay. So I need to go back and adjust my outline. I know, however, that I might change my mind, and here’s where git would be useful. Git is a version control system that tracks changes in files.  So if my screenplay were in Git, I could commit the changes with a message, letting me know what changes I made (“Added mentor figure to guide hero earlier”).


I finally create the basic plot overview, and the document is ready for collaboration. To be the project I want it to be, I open it to an audience of writers, basically people I don’t know. I don’t want them to have total control over the writing, so I need to put the project somewhere online where I could be in control but allow for the most collaboration. Here’s where GitHub comes into play.

GitHub is a git repository that houses git repositories for users. Now, you don’t have to collaborate on GitHub, so I could just house my project and be done. But that’s no fun. So I open it up for collaboration. Now anyone can look at my project and collaborate. Maybe someone who’s really great at character arc comes along and knows she can enhance the character arc by adding to Act I of the screenplay. She first forks the repository, which means she creates a copy of the screenplay that she can edit in her own GitHub repository. Her edits stay on her version until she creates a pull request. The pull request tells me, the creator of the screenplay, that a new screenwriter has added to my project. I look it over and say, “That’s pretty good.” Then I merge the pull request, and it adds it to my copy. Then another screenwriter comes along who is great at dialogue. He looks it over and says, “This is good character development, but it needs smoothed out.” He updates the dialogue, creates a pull request, and then I merge his revised section into our screenplay.

Eventually, it might get to a point where I’m considering adding a wild plot twist. I don’t want this on my base branch because I haven’t thought it completely through, but I think it would be fun to write. This is a good opportunity to use a branch. Actually, it would be really fun to work out a plot twist collaboratively. Sometimes when I’m writing and decide to go back later on and add a plot twist, I miss some of the later connections I need to make. Having a large number of people working on the screenplay would help to prevent that.

So we’re almost done with the screenplay. Someone comes in and creates a pull request to change the ending, and it’s, let me be blunt, terrible. It’s simple, instead of merging I close the pull request.


There’s a lot more to GitHub, but the basics start here with the repository, master and branches, and pull requests. You likely won’t be working on a screenplay in GitHub, but you will probably have a coding project there, especially if you’re interested in working on open source projects. But for those of you who want to collaborate on a screenplay, you know who to message ; )
