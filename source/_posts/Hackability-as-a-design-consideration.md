title: Hackability as a design consideration
summary: What is hackability and how/when do I use it to design a system?
date: 2018-01-31 14:18:30
tags: code, systems
---

When designing a system or a product, one consideration to take into account is its "hackability." When something is hackable, then you can freely mess around with its rules and functionality. When people describe something as "hackable", they are usually talking about one of two things:

1. The ability to give something new, unintended functionality that was not originally present.
1. Access and exposure to low-level internals that the system is built on

Our main concern will be the first, where the potential for design consideration is the strongest, but we will also explore the second case. 

In either case, a governing principle is that a hackable design is generally more flexible and powerful, but often more unstable and dangerous, and certainly difficult to control. The challenge is to capture the benefits of hackability while avoiding its downsides. There are different ways to increase hackability -- thereby increasing a system's power and flexibility -- while not increasing any danger or alienating your users.

When something is not hackable, then it is closed off or constrained in some way to its users. This is almost always done for either safety or accessibility reasons (and often both). The safety reasons are usually to protect the user from themselves -- don't let them shoot themselves in the foot. The accessibility choices are usually made to hide a lower-level system that is too complicated, a security risk, or is proprietary.

Let's start by exploring the second idea, that of granting low-level access to improve hackability.

# Hackability as exposing low-level internals

Examples of this type of low-level design include:
* Direct memory access in C
* Metaprogramming in lisp
* Access to read and manipulate the source code for a web page

All of these examples give both great power and risk. Programming in C allows you to write very fast, optimized code, but can also leave you vulnerable to security risks, such as Heartbleed, which was caused by a buffer over-read in memory. Likewise, metaprogramming in Lisp gives you great potential to both extend the language and obfuscate your code.

Perhaps the most inarguably positive example was the design decision to make it easy to expose and play with the code for webpages. In the early days of the internet, this was particularly useful in learning how to write HTML for your own site. This type of hackability has fallen by the wayside in recent years due to code minification and bundling, because you can't read the HTML or list the javascript libraries that people use. The downside to an open browser design is that client code is always insecure and untrusted, but people have learned how to mitigate that weakness very well over time.

One way to expose internals while keeping the system safe is to *contain* the unsafe parts, by ensuring that these parts cannot damage other parts in the outside world. An example of this is allowing users to directly manipulate memory, but constraining and locking the memory space in which they can work. [Web assembly](http://webassembly.org/docs/semantics/http://webassembly.org/docs/semantics/) is an example low-level, very fast assembly language that has good memory safety.

On the other end of the spectrum, we have some examples of highly closed systems:
* Trusted computing
* Digital rights management
* Incompatible, proprietary hardware (ie. Apple)
* Centralized, abstracted servers (eg. Amazon Lambda)

[Trusted Computing](https://en.wikipedia.org/wiki/Trusted_Computing) is an interesting example of perhaps the most unhackable design imaginable, where the very machine you are working on is closed off to you with hardware-level encryption. This might seem overly tyrannical, but likely has its place in really frightening areas like government missile launching systems.

A large category of products close off their accessibility and internals strictly for proprietary and marketing reasons -- an easy hardware example being Apple, with its plethora of dongles, and main software example being digital rights management. There is no particular design consideration here, as this is only about large corporations building moats around their market shares.

A more subtle case is when designers create highly abstract systems to make their product more convenient to their users. When someone uses high-level cloud services like Heroku or Amazon Lambda, they may save time and avoid having to learn or maintain extra systems, but they are also closed off to the actual machines (or even virtual machines) that actually run their servers.

A concrete example is the Rails web framework, which generally abstracts away the ability to write SQL. You get the convenience of staying in Ruby and only thinking about Ruby objects, at the expense of making it much more difficult to write complex, optimized SQL queries that take advantage of underlying database features.

When thinking of whether to expose low-level internals for your end-user to play with, context may be the most important thing. How much of a safety or security risk am I taking? If you are making a programming language that is intended for video game engines, such as [Jai](https://github.com/BSVino/JaiPrimer/blob/master/JaiPrimer.md), then you know that the main use case will be graphics rendering, not secure internet communication. To make graphics rendering as optimized as possible, you might include low-level memory features that would be considered unsafe in other contexts.

The question of whether to hide details for the sake of convenience might be the hardest design consideration. You have to evaluate how confident you are that your users will never need to understand or manipulate those details that you have hidden. I find that this is more often an bad assumption that you can hide internals from your users, rather than the other way around.

# Hackability as the ability to give something new, unintended functionality

While this category of hackability seems closely related to the previous category, it has a lot of its own, unique considerations. Some examples include:

* Higher-order functions and function composition
* Bash and pipes, node streams
* Uniform protocols and data structures (eg. JSON APIs)
* Standards (eg. HTTP) and (eg. micro-USB versus Apple)
* Openness and accessibility
  * Wikipedia, OpenStreetMap, and the web in general

One key feature in the above examples is composability, which is closely tied to modularity. Programming language features, like robust package managers, package type signatures, higher-order functions, lazy evaluation (see [this paper](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf)) all promote modularity and composability. Unix tools, especially the ability to pipe programs together, is a great example.

Why does composability make a system more hackable? When you are able to build everything from small pieces, and you can combine those pieces in unexpected ways, then you have a much greater potential for new ideas. If you have a single, large framework that you add plugins into, you have much less creative potential than if the entire system is built up from smaller composable parts.

Consider making all the modules in your system single-purpose. If any module is multi-purpose, then all the different purposes within that module can't be recombined or individually extracted. For example, if a module combines two concerns, A and B, and you combine it with other modules, C and D, then you only have a few options: `AB+C` or `AB+D` or `AB+C+D`. Instead, if you have separate modules for all concerns A, B, C, and D, then you have many more possibilities: `A+B+C+D`, `A+B+C`, `A+B+D`, `B+C+D`, `A+B`, `A+C`, `A+D`, `B+C`, `B+D`, or `C+D`.

Composability is a particularly nice design consideration because, unlike many of the other forms of hackability we have explored, it has very few downsides. Arguably, systems that are made of smaller, composable pieces will have a higher learning curve. But another argument might be made that you will have a more thorough and useful understanding of your system in the longer term if you actually understand all its components.

Standards can both increase and decrease hackability. They increase it when they allow things to be more inter-operable, such as micro-USB versus the various proprietary Apple connectors. Other standards may actually impose so many constraints on your work that you're unable to create the things you want to create because you have no flexibility. The design challenge is to strike a magic balance, where the specification in the standard is generalized enough that people can create unimaginable things with it, and don't find particular reasons to complain and constantly change it. HTTP is a good example of this -- the format has hardly changed in decades, and yet people manage to make drastically different systems and ideas with it.

If you want to make something more hackable, you might think of three main considerations:
1. How composable are the pieces in the system? Can you take pieces and recombine them in new ways to get new effects?
1. How accessible is the system? Are there good educational resources that allow users to understand the system in order to extend it?
1. How open is everything? Can users read, use, and modify work made by other users? Can users read and modify the system itself?

A final but important point is to promote play and experimentation. Tools like sandboxes, consoles, interactive tutorials, code sharing websites can all help tremendously. If hackability is about finding creative and unexpected uses for an existing system, then the ability to play with the tools may be your most important feature.

Feedback: jayrbolton at protonmail dot com
