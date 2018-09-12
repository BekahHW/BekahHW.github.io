---
layout: post
title: "Breaking Down Ruby Variable Scope"
date: 2018-11-09
---

I'm building my way up to a personal project. But before I approach the project, I want to reinforce basic knowledge by going over what I've learned about Ruby and SQL so I can do what I want. For me, the basics start with the different types of variables used in Ruby. Although I'm primarily using local variables, it doesn't make sense to move forward without knowing what other types of variables are out there.

## Types of Ruby Variables

### Global
The easiest way to tell if you're looking at a global variable is if the variable begins with a $. But I've heard experienced programmers say to almost NEVER use global variables.

### Local
Local variables either begin with a lower case letter or an underscore. They can only be used within the method or loop in which they're found. Local variables, then, are defined by scope. With every new scope, local variables change. A more common way to see a local variable is as passed as a parameter for a method. In the example below, "count" is treated as a local variable.

```
def times_kids_ask_for_snacks(count)
    if count <=10
      count +=1
      puts "Mom is happy."
    elsif count > 10 && count < 20
      puts "Mom is annoyed."
      else
      puts "NO!"
    end
  end
  ```

### Instance
The signifier for these variables is a single @. The value is available to a specific instance. Once you leave the scope of the object, you don't have access to that instance variable. I like to think about different instances as rooms in a house. In the house, there are rooms that have things in common. A room will have a type, beds, floors, and windows. One instance of a room, might be my living room. There are three windows in my living room. There are no beds and hardwood floors. That data belongs to my the instance of a room known as a living room. Now, another instance of a room would be my bedroom. My bedroom won't remember any of the elements contained in the living room. It doesn't need to. What it does need to know is that there is one bed, hardwood floors, and two windows. So, to create this instance and to use the variables, it could look like this:

```
class Room
  attr_accessor :name, :beds, :floors, :windows

  def initialize(name, beds, floors, windows)

<!-- local variables signified by @ will
 store the information for the instance we're creating-->
    @name = name
    @beds = beds
    @floors = floors
    @windows = windows
  end
end

<!-- Create a new instance of a room. -->
bekahs_room = Room.new("bedroom", 1, "hardwood", 2)

<!-- Return the instance -->
bekahs_room

<!-- Results -->
<Room:0x00007fef53967c98 @name="bedroom", @beds=1, @floors="hardwood", @windows=2>
```


### Class
These variables are indicated by @@. All instances of a class have access to these variables. If the value of this variable changes, it will also change for each of the instances. For example, we can use @@all to keep track of all of the room instances in our house. We could set that up like this:

```
class Room

  @@all = []

  attr_accessor :name, :beds, :floors, :windows

  def initialize(name, beds, floors, windows)
    @name = name
    @beds = beds
    @floors = floors
    @windows = windows
    @@all << self
  end

<!-- Class method to access the @@all array -->
  def self.all
    @@all
  end
end

<!-- Create two instances that are stored in the @@all array upon initialization -->
bekahs_room = Room.new("bedroom", 1, "hardwood", 2)

living_room = Room.new("living room", 0, "hardwood", 3)

```

Now when you return the value of the @@all class variable, it will give you the two instances in an array:

```
[#<Room:0x00007fef53967c98 @name="bedroom", @beds=1, @floors="hardwood", @windows=2>, #<Room:0x00007fd88f321080 @name="living room", @beds=0, @floors="hardwood", @windows=3>]
```

Understanding the basics forces us to think deliberately about what we're coding. It helps us to imagine what we can build with each of those pieces. Today I heard a speaker talk about project-based learning and its importance in our development as new coders. This is the beginning of my project. Stay tuned for more to come.
