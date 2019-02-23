---
layout: post
date: 2019-02-23
title: "Building Out Our Schema: Screenwriting Project Continued"
---

So we have our models and associations, but before we really start to code, we need to get a better idea of what information these models will hold. When we look at the schema, it gives us a picture of what the database looks like, what information it accepts and stores. First, we'll create the attributes, and then we'll look at how to use ActiveRecord to create migrations for our schema.

So far, these are our models: Screenwriter, Screenplay, Genre, Agent. That's a great start, but we need to be able to store information about these models in a database. Eventually, we'll be using postgres.


|  Screenwriter   |   Screenplay   |   Agent  |   Genre   |
|-----|-----|-----|-----|
| name   | title    |   name   |   type  |
| email  | logline   |    accepting |     |
|    |   query letter  |   email  |       |


This is the information we want to put into the database. When we go to write our migrations, however, we need to know what type of data each submission is. In this case, we are going to use three types: string, text, and boolean. Generally, you use string for short text inputs like name, email, etc. Loglines are short and sweet explanations of your entire screenplay, but in terms of classifying data, aren't under 255 characters. For example, my brother and I wrote a screenplay with the following logline: *In the future, society is on the brink of a meltdown when new technology is introduced that changes aging forever and restores prosperity to the United States. But Benjamin Braverly, a rising star in the company that created the technology learns that everyone has been deceived and that technology is masking a huge secret.*

You can see that it's a little bit long, so along with the query letter--an email that asks agents to represent the screenplay and also provides the screenplay's genre, logline, summary, and author bio--it will be assigned text.

The last type, boolean, assigns a value of true or false. Guess which attribute will be a boolean....If you guessed accepting you're right! Generally speaking, you won't know the answer to this question about agents. And I've found that many agents who say they aren't taking new writers, will if they find the right writer. Either way, you can leave it blank in the submission form if you don't know.

Ok, so we have the information we need, so what do we do with it? Well, if you have your models and database set up, you can create a migration. Make sure that in your db folder, you also have a migrate folder to handle your migrations. My favorite way to create a migration is using Rails and ActiveRecord because it makes it so easy.

In the command line, I would run the following to generate my Screenwriter table with the submittable attributes:

```
$ rails generate migration CreateScreenwriters name:string email:string
```

Notice a couple of things:
1. The table name is plural.
2. On the left side of the colon is what you'll call the attribute.
3. On the right side of the colon is the data type.

Next, run rake:db migrate. If your migration is successful, you'll end up with a file in your migrate folder that looks something like this:

```
class CreateScreenwriters < ActiveRecord::Migration[5.2]
  def change
    create_table :screenwriters do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
```
You could've written that all our yourself and then run rake:db migrate, but I find it's easier to do it using the command line.

If you take a look at your db/schema.rb file, you'll see a bunch of commented out text followed by something like this:

```
ActiveRecord::Schema.define(version: 2019_02_23_somenumbers) do

  create_table "screenwriters", force: :cascade do |t|
    t.string "name"
    t.string "email"

    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
  ```

I would go through and do this for the other data we've come up with, just switching string out for the correct datatype. This means we're just about ready to get something we can see on a screen down in your text editor. But more about controllers and views later.
