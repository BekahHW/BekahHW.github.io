---
layout: post
title: "Class and Instance methods, Momlife Style"
date: 2018-09-29
---
Once you understand variables, you're ready to dive into classes and objects. A class, in simple terms, is like a blueprint for objects. I like to think of it as an overall storage center for things of a same type. For example, I'm working on a program for my moms group where I need information about moms and student helpers. It might make sense for me to have a mom class in order to organize all of the instances of moms and a student class to organize my instances of students. An instance is a particular occurrence of an object. Within each class, I'll have instances of moms, which is really information about one particular mom. So instance = specific.

Let's work with the mom class. First, we know that a class is signified by the word class followed by the title of the class capitalized. Each class also needs an end.

```
class Mom
end
```
Now we have a class that can assign attributes and store all of our mom objects. But what does *that* even mean? Well, we know that when a mom is "created" there are certain attributes that she'll have. I think every mom needs a name, and we should know how many kids she has. When a mom is created within the class, we initialize these attributes. To initialize is to create or to call into being. When we initialize a new mom, we are creating her.

```
class Mom
  attr_accessor :name, :kids

  def initialize(name, kids)
    @name = name
    @kids = kids
  end
end
```
If you're confused here, don't worry. I was too. What's happening here is initialize is assigning a local variable (name) to an instance variable (@name). Let's make me, for example.

```
Mom.new("Bekah", 4)
```
When I call Mom.new, I'm creating a new instance of a mom. I'm passing the arguments of name and kids in the parenthesis because that's what I've set up in my initialize method. You'll notice that I have quotes around "Bekah" because it's a string. If I didn't have the quotes, I would get the error "uninitialized constant." What would happen if I tried to only assign one of the initialize attributes?

```
Mom.new(Amanda)

```

I would get ArgumentError: wrong number of arguments (given 1, expected 2).

Now, let's create an instance method, so our moms can do something. We want them to introduce themselves.

```
class Mom
  attr_accessor :name, :kids

  def initialize(name, kids)
    @name = name
    @kids = kids
  end

  def intro(name, kids)
    "Hi, my name is #{name}, and I have #{kids} kids."
  end
end
```

To call my instance method(intro), I first need to create an instance and assign it to a local variable. Then I can call the method on the instance.

```
b = Mom.new("Bekah", 4)
b.intro("Bekah", 4)
```
This will print out  "Hi, my name is Bekah, and I have 4 kids."

You may have noticed that I'm using string interpolation here. That means I'm creating a string and Ruby reads my code that's in between the #{ } and inserts it as part of the string. It's important that I use the double quotes here. If I didn't I would get: Hi, my name is #{name}, and I have #{kids} kids. Even in this example, there's a lot going on. I've found that coding is kind of like being a mom, though. You learn as you go along. With the first kid, you don't quite know what to expect or all the right things to say or do. By the time I had my fourth, being a parent had clicked. I just had to stick with it.
