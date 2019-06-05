---
layout: post
title: "Project Walkthrough"
date: 2018-08-21
---

For my first solo project with Flatiron School, I had to create a CLI Ruby Gem where I scraped data from a website and went at least one level deep. Because I'm still in this weird space where I feel like I don't know anything even though I've learned a lot over the past 232 days that I've coded, I was a little terrified to take a step toward my project. Luckily, my mentor messaged me about doing a video chat, and she got me going. But then I needed to do some mapping out.

My idea was to scrape a site with the [top 72 heroines in movies](https://editorial.rottentomatoes.com/article/fearless-female-movie-heroes-who-inspire-us/). I'm both a feminist and a person who's written more than a handful of screenplays and spec pilots. So it's important to me to have strong female characters and to give credit to the writers who rarely get credit (it's usually the director and movie stars who get the credit). After providing the user with a random list of ten of those movies to choose from, I would scrape more information, including the year, overall rank, heroine rank with summary.

To do this, I would need three classes: Filmography, CLI, and Scraper. The Filmography class would contain the attr_accessor for the information I was storing for each instance. The Scraper class would build the method for scraping the data from the rottentomatoes site. The CLI would provide the command line interface that asked the user for input and called the scraper methods to return the data.

To start, it was both easy and natural to start with the Filmography class. I knew the data I wanted to scrape, so I created attr_accessor, a class method @@all = [] in order to store the information I was scraping, a self.all method to access the information, and a save method, so there would be something in that array.

Next up, I could start my CLI. I would need to start the process, then provide a list, and then let the user select options from the list. The start method was simple. The method greeted the user and called the next method, list.

The list method was more complex. I didn't want to return the full list of 72 because that's a lot for the user to look through. Instead, I wanted a random list of 10 movies. I decided to use the sample method. Easy enough. I was able to return a sample of ten movies with index starting with "1". Next, I asked the user to select a movie for more info. Here's where I ran into hours worth of problems.

When the user selected a number from the list, it returned info on a movie, but the number the user selected corresponded with the number from the rottentomatoes list, rather than the random list I created. At this point, I was working with an additional method. I was having a hard time understanding how to set the list equal to a variable and then accessing that variable from the next method. Then I thought it might work to ask the user to give the input by the title of the movie. This would require me to compare this title, to a title in the array and then return the information. This was starting to get complicated.

Luckily, I was able to pair program with another student who helped me to discover how to set the list equal to a variable that I could continue to access. I honestly was so close. One of the things I decided to do was use one method instead of two to simplify the logic. Now, the user could select a movie, information was returned, and then I wanted to do one more scrape.

So now I was onto my second scrape. Because I think screenwriters don't get the credit they deserve, I want the user to be aware of who the screenwriter is, and what other movies the screenwriter has written.

The next scrape required me to scrape from another page that corresponded to url of the movie chosen. MORE PROBLEMS. As I inspected the page, I saw that the data was very generically titled. Instead of being able to grab the data piece by piece (director, rating, screenwriter), I had to grab the whole unordered list. It took me a while, but I was able to. The problem was, the formatting was really off and too difficult to read. I tried to .strip and to do some funky gsub-ing, and it didn't get me where I needed to be.

I was really disappointed this wasn't going to work, but I decided on a consolation prize. I would open the url in a new window, so at the very least the user could find the screenwriter on their own. I initialized the movie url in my Scraper method and added the open_in_browser method in the Filmography class, and then I called it in my CLI method.

Although it didn't go the way I wanted it to, there was a natural flow of information that came to a natural conclusion, so I'm satisfied with the results. Next week I'll walk my tech lead through the program and answer any questions. And now I can say that I made something on my own. I've internalized these concepts. I can speak them aloud. That's what motivates me to keep moving forward.

