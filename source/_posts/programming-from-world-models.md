title: Programming with world modeling 
summary: Thinking of programming as a creative process of declarative world-building.
date: 2017-08-26 17:31:30
tags: pld
---

In the creative process of writing code, most programmers start solving a problem by thinking of the steps they need to take to get some output, thinking algorithmically right off the bat. An alternative approach is to think about modeling a small universe, full of things with properties, relationships, and laws. This is like starting a novel by profiling a set of characters, their relationships, and their environments, before you start writing any particular character's story. 

This approach caters to our intuition, possibly leads to more maintainable and scalable programs, can be more fun and creative, and is likely applicable to a wide range of projects (such as user interfaces, simulations, systems programming, scientific computing, web applications, games, and others). It would not apply to all programming across the board, but would be relevant to any project that involves creating a dynamic system, full of interacting entities and outside events.

In this approach, you start by coming up with the data model of your world. The complete process might be something like:

1. What are the entities in the world, and what properties do those things have?
  * Structs and union types (enums) containing primitive data and other structs
2. How are the entities related to each other?
  * Cross-referencing, nesting, and constraints
3. How do those things interact with each other?
  * Core functions that manipulate the entities
4. How do we start the world running and handle what happens over time?
  * code that instantiates entities and calls their functions

For item 1, all we really need in the language are structs (templates for fixed key-value storage in memory), vectors, and many primitive datatypes. Type parameters (generics) would be useful as well. For now, we don't need to think about how our entities get instantiated, copied, changed, or stored -- just know that we can define them.

For item 2, we need to think about functions that take the entities in the world as parameters and manipulate them. These functions can be strongly typed, close to pure, side-effect free, and operate on immutable data. This constitutes some of the "core logic" of any module.

Throughout the process, an expressive type system will help us along the way. Don't think of types as authoritarian restrictions on your ability to code; instead, think of them as meaningful descriptions of how your system works. They're useful during the planning stage, when you're first coming up with how things look and how they relate, and they're useful for maintenance, when you're trying to get readable overviews of how things are connected. Typing is like smart documentation that gives you some clues about the meaning of the program, without having to decipher it out of procedures. 

The ML module system is a great example of a versatile, expressive type system that would be great for world-building. For the purposes of this post, however, we can stick to some simpler pseudocode.

# Up and then down

To give you an idea what a simple world-modeling creative process might look like, let's take an example of controlling an elevator. We want the elevator to transport people up and down the building according to floor requests in the most efficient way possible.

## Things and their properties

Below is pseudocode, where the goal is to show the idea without getting distracted by implementation details. We start off by defining some structures ("entities"), that each contain some data fields and constraints on those fields.

    ---
    union Movement
      Up | Down | Idle

    entity Elevator
      floor: Floor
      people: People
      maxPeople: uint
      status: Movement
      queue: array of Floor
      constraints
        people.count <= maxPeople

    entity People
      count: uint
      destinations: array of Floor
      constraints
        count == destinations.length

    entity Floor
      people: People

    entity Building
      elevator: Elevator
      floors: array of Floor
      constraints
        elevator.floor < floors.length


This is just a handful of simple structs, but already says a lot about the world. Any of these things can be tweaked as the problem evolves, like allowing for multiple elevators in the building. Some of the properties of this world are:

* A building contains some number of floors
* An elevator points to one floor at a time
* An elevator has a maximum capacity, but floors have no max
* A floor queue keeps track of next floors to visit
* Elevators hold a queue of what floor to visit next
* People have an array of floor destinations -- which person wants to go where? This will have the same length as the number of people ('count')
* The building has one elevator
* The people in an elevator must be at least 0 and less than its max capacity
* The floor that the elevator is on must be at least 0 and less than the number of floors in the building (ground floor is 0)

By laying out this world, some ideas for what functions we can write will start to flow out of us:

* An elevator can work off its floor queue. We could use a sorted data structure for the queue to have the most optimal elevator path based on its current Movement and its current Floor.
* We can unload an elevator into a floor by iterating through the `Elevator.people.destinations` array and finding ones that match the current floor.
* We can remove people from a floor by iterating through the `Floor.people.destinations` array, finding the destinations that match the current floor (ie. they are already where they want to be).
* We can make requests of the elevator from another floor by iterating through the `Floor.people.destinations` array and finding people who want to go to a different floor (ie. they press the outside call button).
* We can load people from a floor into an elevator by looking at `Floor.people.count`, the `Elevator.people.count`, and `Elevator.maxPeople`.
* We can merge two `People` entities together by adding their `count` and concatenating their destinations (ie. for loading and unloading the elevator).

We haven't implemented anything yet, but we already have a fairly advanced picture of how the world works just by thinking about the entities. When the time comes to actually start writing some code, the functionality will be very clear, since we've already considered much of the problem domain.

In the above example, the "constraints" are a set of runtime checks that should always be true for the struct. These can run during your development and testing phases when the structs are created or updated. They can also run automatically during tests, using auto-generated values from the types, similar to Haskell's QuickCheck. Think of the properties as physical laws of the world, serving as declarative documentation along with the fields of types.

One nice thing about world modeling is that the programmer can always return to the entities and easily expand some of the concepts as the problem evolves. Say we wanted a building with more than one elevator: our `Building` model could hold an array of Elevators instead of just one. Other expansions might include:

* Elevators could have a `maxFloor`, which they cannot go above
* Elevators could keep a history of their requests, and optimize which floor they should idle on.
* We could track the open/close state of all elevator doors on each Floor.
* Each floor could have a panel showing which floor the elevator is currently on, along with its movement direction.

From here, the rest of the program would be more algorithmic, standard programming: implementing the core functions and creating some code that instantiates the world, including introducing random new people on the floors with random destinations over some number of loops. This algorithmic code would still constitute the vast bulk of the overall program. The difference here is that the algorithmic code has been _determined by_ the data model, rather than the other way around.

If we wanted to start introducing time delays in our simulation, such as a half-second delay for the elevator to travel between floors, then that time-delay can be done in the instantiation phase, using an abstraction like streams. Instead of calling our core model functions directly, we would be calling them within higher order functions like map or scan, or within time delay callbacks. The key is that these core functions over static data structures never have to change, they've only become nested inside some time delay wrappers. The models and core functions still largely determine how the world works.

## Further reading

* [ML Modules](https://jozefg.bitbucket.io/posts/2015-01-08-modules.html)
* [Denotational semantics](https://en.wikipedia.org/wiki/Denotational_semantics)
* Off the deep end: [situational calculus](https://en.wikipedia.org/wiki/Situation_calculus)
* [Functional reactive programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
