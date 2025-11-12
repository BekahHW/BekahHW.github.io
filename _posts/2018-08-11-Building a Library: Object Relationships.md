---
type: post
title: "Building a Library: Object Relationships"
date: 2018-08-11
tags: [Technical, Learning]
---
I've been trying to understand Ruby object relationships for a while now. And generally, I have a grasp on what that means, but I still spend a lot of time figuring out what belongs to who and who has many of what. And then my brain starts to spin. But then I came across this [article](https://medium.com/@marcellamaki/object-relationships-in-basic-ruby-1af5773fff48), which spells it out really nicely. So to practice my understanding of the concepts, I came up with a parallel example. Instead of a cinema, I'm going to take you through a library, since I'm sitting in the library right now.

Let's start with the Library class. Since we don't live in a post-apocalyptic dystopia, we know that there are many libraries. And in these libraries, there are many books. But before we talk about the books, we need to know a little bit more about the library. There are certain attributes that all libraries have. For example, they all have a name and a location. We also know that they will all have books, but they will differ based on each library. Because of this, we need to assign the books variable to an empty array. Because all instances of a library will have these attributes, we include them in initialize.

```
class Library
     attr_accessor :name, :location

     def initialize(name, location)
        @name = name
        @location = location
        @books = []
    end
end
```
Each instance of a library has many books. Let's talk about that for a minute. It's not the job of the library class to remember all of the books. The library class is only responsible for remembering all the libraries. This is the [principle of singular responsibility](https://medium.com/@tedtoer/single-responsibility-principle-in-ruby-examples-6a468da2cf5f).So we need to create a book class that keeps track of all the books.

When we think about books, there are certain attributes they all share, including title, author, and page_count. We need to let the book class know that it belongs to the library class, so we include that in our attr_accessor.

```
class Book
     attr_accessor :title, :author, :page_count, :library

     def initialize(title, author, page_count)
        @title = title
        @author = author
        @page_count = page_count
        @@all << self
    end
end
```

Because books are created without knowing which libraries they will be housed in, we don't need a library instance variable.

Now we have the two basic classes defined, but they need to do some communication so we can fill the library with books. How do we do that? Well, we need to add a method in our library class like this.

```
def add_book(book)
   @books << book
   book.library = self
end
```

If you're like me, you may recognize that code. You might write it and not even know what it means, so let's break it down. We need a method to add the book, which takes in a book object. We shovel that object into the previously empty array assigned to @books. Now @books will hold onto that book. Next, we have the book object and an instance of a library. We're saying that a particular instance of a library now owns this book. Finally, we set that equal to self, which is the instance that we're working with right now. 

As I break this down, I realize how important it is to map everything out before you start. If you don't know the relationships between your classes, you'll have a more difficult time writing your code. Library and books are simple concepts to explore, and I know not everything is this easy, but understanding each step of the process is important before moving forward.
