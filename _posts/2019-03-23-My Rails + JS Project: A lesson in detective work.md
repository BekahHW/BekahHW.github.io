---
layout: post
title: "My Rails + JS Project: A lesson in detective work"
date: 2019-03-23
---

To me, the biggest impediments to any open source project are time, validation, abilities, and community. We want developers to be included as part of the Ruby, and Ruby OSS, community, to be valued for their time,  and to feel comfortable contributing at any level (from new to senior developer). I would love to see Ruby OSS work hard to provide opportunities for new coders and minorities. Some of the ways I think Ruby OSS can improve include:

-Ensuring that developers have some sort of recognition, whether monetary, a badge system, social media shout-outs, and/or recognition of contributors on the README.
-Encouraging companies to allow employees to spend work time on OSS projects.
-Creating open source community events like live coding sessions, Q&A’s with top contributors or managers.
-Creating better onboarding of new contributors, very clearly written contributor.md files.
-Adding autoformatting and linting software setup to eliminate style-related discussions and issues on PRs.
-Including clear codes of conduct to ensure respect and empathy.
-Ensuring efficiency in merging PRs or give timely feedback so contributors are validated and see acknowledgment for their work.
-Labeling issues accurately: contributors shouldn’t have to ask if it’s beginner friendly, an issue that needs to be resolved, etc.
-Inviting frequent contributors to be part of a core team.
-Being open to feedback and welcoming to new members.


I’ll admit, when I started taking my Rails project and adding JavaScript, it broke my heart a little. I loved where I had left off and I had big plans for how to expand it. I could see it all in my mind. But I know it’s never productive to be precious with your work. The second reservation that I had was JavaScript wasn’t exactly clicking. And what I mean by that is I could execute JS if someone told me, but I wasn’t conceptually understanding it. Why would I use this? Where would I use this? I kept waiting for it to click, and it kept not clicking. Because I had made it through the lessons and sought outside resources, I decided I should just jump in. The problem with jumping in when you don’t know exactly where you’re going, is that you just kind of put your finger on the map and say, “this looks like a good place to start” with no context as to whether that nice looking spot on the map is really a suitable place. And my finger landed on a join model, UserDisorder.

Before jumping into JS, I needed a couple of things: I needed to add code to my controllers that should be rendering json. For example, I would need to tell my new controller to render html and json when needed

```
  def new
    @therapist = Therapist.new
    respond_to do |format|
        format.html { render :new}
        format.json { render json: @therapist}
    end
  end
```
I had to add my serializers for the models I was going to be working with. I’m not going to lie. I spent a long time wondering why one thing wasn’t working only to realize that I didn’t have my serializer. It’s a simple command:

```
Rails g serializer therapist
```
My application.js file was in good order:
```
//= require rails-ujs
//= require jquery3
//= require activestorage
//= require bootstrap-sprockets

//= require_tree .
```
Now I was ready to deal with this UserDisorder. This wasn’t the worst place to land because I did have to fulfill the requirements of a has_many relationship. And I did a little backtracking. Rather than working with the UserDisorder table, I moved a step over to work with the Disorder table. A disorder has_many :user_disorders, which I could render on the disorder index page. The idea was, I could have all the disorders, which are pre-seeded, as a link that could be clicked. When the user clicks the button, the description appears, which is actually rendering the disorder/show view. And below that would be the narratives about that particular disorder, which is rendered from the user_disorder/show page.

Here’s where I hit my first wall. The first, which took me hours to figure out, was a Chrome issue. One of my extensions was preventing my JS to load. It worked in Firefox, but not Chrome. Once I disabled that extension, I was ready to hit my next wall: the authenticity token. I know I went through the lessons where it was addressed, but my brain totally blanked. So I searched far and wide for a solution, did it a complicated way, and then simplified it. Once I realized where it was in the code, by looking at it in my console, I was able to add it to my data with my submit before my post:

```
data = {
      'authenticity_token' :  $("input[name='authenticity_token']").val(),
      'therapist': {
        'name': $("#therapist_name").val(),
        'location': $("#therapist_location").val(),
      }
```

Ok, now I was cooking with fire. I needed to make some click handlers and a couple of API requests, and I’d be done. I used both fetch and ajax. I started with just ajax, because it’s easier for my mind to understand. Once I had things working, I changed a one over to fetch.

The most important tools I used as I was going through these ajax calls were console.log() and debugger. By the end of the project I wasn’t so lost anymore because I knew what I expected this program to do. I just needed to find where it was doing that.  By using those tools, I was less a programmer and more a detective, tracking down my missing data, and things were finally clicking.
