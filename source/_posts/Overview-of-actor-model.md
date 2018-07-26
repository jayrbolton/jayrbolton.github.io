title: 'A meandering overview of the actor model'
summary: With extended ideas and applications
date: 2018-07-22 18:00:00
tags:
---

The actor model is an elegant way to handle concurrent programming, allowing you to scale a system from a single computer to a large, distributed network with little trouble.

In the actor model, you create a network of discrete worker processes ("actors") with some unique properties:

* Actors can send messages to other actors, with a message name and arbitrary data attached
* Actors can receive messages with certain names
* Actors are stateful; state can be updated when a message is received based on the message name, data, and previous state
* Actor state is totally private -- they do not share state with other actors unless they send some of it in a message
* The data in all messages is effectively pass-by-value.
* Every actor runs as a discrete process, concurrent with all other actors
* The functionality within an actor -- the stuff that happens when a message is received -- is totally serial.
* Actors receive messages serially, one at a time. They use a queue with a first-in-first-out priority to work through their messages

Multiple actors may be running on a single CPU, threaded, or they may be running on multiple CPUs on a single computer, or you may have a highly distributed network of thousands of computers across the world. In the actor model, these differences are made insignificant in terms of setup. As long as a single actor can send and receive messages using a common protocol, then it can run in any of these scenarios.

Actors typically encapsulate a single concern; their boundaries are determined by discrete units of data and behavior that need to be updated concurrently.

> In performing our analysis of the problem we must choose an appropriate granularity for our model. For example, if we were writing an instant messaging system, we might choose to use one process per user and not one process for every atom in the user’s body. -- Joe Armstrong

Actors, of course, have limitations. The programming model at times might feel oppressively simplistic:


> ...this is a world in which everyone sits in a windowless room and communicates only by mail. --Rich Hickey

Which, to me, actually sounds very appealing when it comes to large-scale, parallel computing: the less I know, the better.

Something akin to the actor model was the original design conception behind object-oriented programming and early systems like Smalltalk. This designe emphasized a “tell, don’t ask” mantra that informed its architecture: to talk to an object, *tell* the object what behavior you want from it. Send messages, but don’t block for responses.

## Advantages

It’s easy to program a single actor, since it can be totally serial. When an actor receives a message, it doesn’t need to worry about concurrency. You can have a simple, stripped-down, serial language that runs inside each actor. The logic for receiving a message can consist of a simple pipeline of pure functions that transform data.

This internal, pure, serial language doesn’t need to be concerned with messy, real-world things like IO or async. It’s just a data transformation pipeline. 


You can scale a parallel system from a single CPU to multiple CPUs, up to a network of closely connected servers over fiber, all the way to a larger composite network. This is because the way actors interact with each other -- the message passing format -- is the same in all situations.

Unlike object-oriented reference graphs, which are usually a tangled web of hierarchies and execution paths, the network diagram of a cluster of actors can be very clear and explicit.

## Existing work

A few of the most prominent industry-grade implementations of the actor model are Erlang, Elixir, and a JVM platform called Akka.

[A Clojure article has a notable section](https://clojure.org/about/state#actors) about the actor model with an explanation of why the creator chose not to use it as a core principle of the language. It is a good discussion of some of the downsides of the actor model when you are mainly concerned with local, single-process concurrency.

A response to the above criticisms was made in a [blog post from 2010](http://www.dalnefre.com/wp/2010/06/actors-in-clojure-why-not/), which describes some good counterpoints in defense of actors. A key point is that actors should never block: the response to a sent message must be handled by a separate message receiver. This principle is embodied in the mantra “tell, don’t ask”.

### Erlang and OTP

A very detailed and readable overview of Erlang, along with a history of its success using a variation of the actor model, is found in this [2003 paper by Joe Armstrong](http://erlang.org/download/armstrong_thesis_2003.pdf), the creator of the language.

Erlang implements the actor model fairly closely, where each “process” in Erlang corresponds to a concurrent actor, with a number of message receivers. 

A key emphasis of Erlang is fault tolerance and error handling. In Erlang, actors don’t handle their own errors. You attach a monitor actor as an error handler to a worker. This way, the actor which performs real work contains more readable and intentional code describing its purpose; plumbing for error handling is offloaded to a different actor.

Another key feature of Erlang fault tolerance is the tree hierarchy of supervisory actors. Supervisors are responsible for restarting child nodes when they crash according to a configured policy. Supervisors will stop their children when they are stopped by their parent, and they’ll restart a child when they crash. It seems to generally be true that resetting a system (thereby resetting its state) tends to fix most problems the majority of the time, so you may as well automate the process.

It’s important to note that Erlang has a mechanism for sending a message to another actor, and then blocking for the response. This is not an intrinsic part of the actor model and can cause race conditions (eg: A waits for B which waits for C which waits for A). It may be cleaner to have actors which can never block, and have different mechanisms for handling call and response, if needed.

#### Elixir

Elixir is a modernized version of Erlang with a syntax that feels like Ruby. It runs on the same VM as Erlang and has most of the same principles and semantics as Erlang. For modern applications, Elixir is likely the preferred platform for a better dev experience (ie. more modern package management, CLI and interaction, and other tooling).

### Akka

Akka is a JVM-based platform for the actor model with a handful of other concurrency mechanisms, such as data streams. It’s language agnostic, supporting Java and Scala. 

Akka has great [high-level documentation](https://doc.akka.io/docs/akka/current/general/actors.html) that describes many of the concepts behind actors. It seems to generally follow all the same design principles from Erlang and OTP.

It’s not clear that the JVM is a good candidate for hosting the actor model, considering it has a pre-existing concurrency model and centralized garbage collection. The Erlang VM is very much designed from the ground up for a very large number of concurrent, small actors.

## Early hardware implementations

It's tempting to take the actor model all the way down to the hardware level, designing an entire stack around the idea. This has been attempted before in a number of examples.

### The Cosmic Cube and The Jellybean Machine

[The Cosmic Cube](http://calteches.library.caltech.edu/3419/1/Cubism.pdf) was a highly connected array of 64 processors, where each processor has a direct connection to 6 neighbor processors and each processor has 128kb of local memory. This machine was invented to solve lattice problems, and it seems unlikely that the setup would be good for general systems programming.

[The Jellybean Machine](http://cva.stanford.edu/projects/j-machine/) was a hardware host for a variation of Smalltalk called [“Concurrent Smalltalk”](https://www.researchgate.net/publication/255631756_The_Design_and_Implementation_of_Concurrent_Smalltalk) (I haven’t yet gotten a copy of this paper and would love to find more details about it).

## Further discussion & ideas

### A Raspberry Pi cluster

The Raspberry Pi Zero (typically about the price of a latte), is a tiny computer with a single 1ghz processor and 512mb of RAM. Building a cluster of hundreds of these would be relatively inexpensive, where each unit hosts one or more running actors.

One could cluster a large amount of raspberry pis using wifi: the Raspi Zero W has a built-in wifi card, and you could use a series of access points to create ad-hoc networks, sending actor messages over wifi signal. This would obviously be slower than a fiber network, but could be a lot of fun for flexible experimentation.

### Data-driven actor implementation

A key feature of the lisp family of languages is that the language syntax itself is written in a standardized data format. Clojure, for example, uses the [edn](https://github.com/edn-format/edn) format for nearly everything.

It might prove effective to use this same principle in an actor model platform:

- All pure functions are defined with edn syntax
- All basic programming data structures and errors are edn
- All actor configuration is defined in edn
- Actor networking, topology, and namespaces are defined in edn
- Actor messages, with name plus attached data, is all edn
- Serialized state, such as an actor mailbox, is all edn

This type of data-oriented and data uniform approach might be particularly suitable for a platform that emphasizes network distribution, message passing, and state transformation.

### A shell-like CLI

It’d be particularly useful to have a CLI for an actor platform that almost imitates something like the bash shell, allowing you to change contexts and explore the namespaces and state of a running actor network. If you have clusters of actors in hierarchical namespaces, then you could `cd` into each cluster’s namespace. When you `ls`, you get a list of currently running actors, with a brief overview of the state of each. 

There may also be a function to display the message history for the current namespace, along with commands for sending messages to specific actors.

This idea is readily combined with the data-oriented approach, where everything presented in the CLI would be in a certain data format, such as edn.

### Supervisors as load balancers

Inspired by microservice clusters like Kubernetes, supervisors in a tree of actors can serve as load balancers. They can be aware of the system resources, such as CPUs and memory, and use that data to replicate nodes in the network.

Supervisors can track the load of an actor by looking at the size of their queue at different time points. If the size of an actor's queue tends to grow instead of shrink, then the supervisor knows that the actor is overworked, and can replicate the actor.

### Supervisors as message busses

Instead of actors sending messages directly to one another, actors could route all their messages to a centralized supervisor. Other actors then receive messages only from their supervisor

```
S1----------S2--------S3
| \ \       | \ \     | \ \
| | |       | | |     | | |
A B C       D E F     G H I
```

In the above diagram, we organize actors into a kind of tree, where each node is an actor. The top three actors (labelled "S1", "S2", and "S3") are supervisors; they send and receive all messages in their local cluster. The bottom row of actors, (A-I) are all "workers".

Like OTP, Supervisors are responsible for spawning other nodes, assuring that a minimum number are always running, and restarting failed nodes. But in this system, they have an additional role: they serve as a centralized message bus for every node connected to them.

The child nodes -- the workers -- perform the real computational work, such as data processing, while the supervisors are responsible for receiving all messages from the workers, or from other supervisors, and then routing those messages back to the connected nodes.

Each grouping of supervisor to worker nodes constitutes a "cluster." Each cluster serves a discrete purpose such as "file io", "user interface", etc.

In order to create a network of actors, you simply start up a single supervisor, which then starts up a cluster of worker nodes, and may start other supervisors (which also may start other nodes).

This setup decouples the networking of the actors from their definition. Actors simply broadcast out messages with names and data to their supervisor, and are not responsible for keeping a reference to an actor that might receive the messages. The supervisor is responsible for knowing what actors can receive which messages, and dispatching out messages to the appropriate actors in their neighborhood.

Generally, you would cluster actors that all have related functionality, so messages within a cluster all have the same contextual meaning. For a example, a message called "read" would be handled very differently in a file IO cluster vs a mysql database cluster.

Supervisors can also serve as a namespacing mechanism: when one supervisor spawns another supervisor, it gives it a name. All messages that it wishes to send to the other supervisor are scoped under that name.

For example, you might have one cluster for handling UI, and one cluster for handling file read-write (with namespaces for 'ui' and 'file'). The 'ui' cluster might send a message with the name `file/start_read`, which gets routed to the 'file' cluster.

When a supervisor is configured, you can define a mapping of received message names to messages that get sent back out as a kind of forwarding mechanism. An actor in the 'ui' cluster sends a message called `file_read`. The supervisor of that cluster knows to map that message to a different name called `read`, namespaced under ‘file’. That effectively forwards any “read” messages to a neighboring cluster.

This allows the programmer to set up the system in more discrete, decoupled stages:

1. Define pure, serial functions
2. Configure workers that receive messages with certain names & data, send messages with name & data, and update private state. You don’t have to worry about networking workers at this point.
3. Configure supervisors, which create a group of workers and other supervisors. Configure a mapping of received messages to forward to other clusters.

Supervisors are just plain actors; this whole system might be built up from a basic actor model.

### UI programming in the browser

UI programming in the browser is extremely concurrent and stateful, so it’s surprising that more frontend frameworks don’t draw direct inspiration from the actor model. While the browser doesn’t have proper thread control, we can still take advantage of other ideas such as message passing, private state, and supervisors/controllers.

Consider a system where every UI “component” is organized into a cluster of actors. Every component would have the same three actors: a View, State, and Supervisor. 

- View: render and patch a DOM tree from state input. Send out messages from user events (eg. “click”, “input”, “submit”, etc)
- State: Keep a state object for the component and merge in key/value updates
- Supervisor: Responsible for initializing all the actors in a cluster and saving them all in a directory. Like the system described above, it is responsible for receiving and dispatching all messages.

To use the classic example of a simple counter interface, we would have a cluster of actors like this:


```
Supervisor-------Counter
|     \
|      \
View  State
```

The View sends out a single user event message named “add” with an attached number (the amount to add). That message is received by the Supervisor and then forwarded to the Counter.

The Counter is an accumulator that receives messages named ‘add’ and increments its stored count by N. It sends out messages named “merge_state” with data for `{“count”: N}`

The State actor receives messages for “merge_state”, updates its internal state, and then sends out an “updated_state” message.

the View actor receives messages for “updated_state”, patches the DOM, and sends out messages for any user events.

The above workflow gives us the full functionality for a complete counter component with a clear architecture.

Additionally, these components are easily composable. The Supervisor would be responsible for launching new components (clusters of actors) and would keep a directory of them. When a supervisor launches another supervisor, it creates a neighboring, connected component. The created supervisor forwards all messages it receives to the supervisor that created it -- its parent supervisor -- where each forwarded message name is namespaced.

Suppose that we want to build a list of counters, where we can dynamically add new counters to the page, remove existing ones, and keep a total running count. We want to reuse all the same code we used to build the individual counter, without rewriting any of it. We start by building a new cluster that appends and removes counter clusters:


```
Supervisor------TotalCount
|    |   \
|    |    \
View State [Counters…]
```

The View would send user-event messages such as “append” and “remove” to the Supervisor, which causes the Supervisor to initialize and remove Counter clusters.

To keep a total count (the sum of all counters), the Supervisor can receive “add” messages from all its connected Counter clusters. It then forwards those messages to TotalCount, which aggregates the sum.

To implement a button that increments all counters in the network, the View can send an “add_all” message to the supervisor, which in turn simply forwards an “add” message to all the Counter clusters.

With this system, we have self-contained, composable, namespace-able, re-usable components with a clear network layout that can be diagrammed.

To create a test network, you can create a wrapper node that initializes the root supervisor for the system you want to test. That wrapper node can send in messages into the system and receive “updated_state” messages to check for correct results.

_A note on Web Workers_

The only interface for threading in browsers is `WebWorkers`, which has some support for a message passing and low-level code importing. Its very limited interface may not be suitable for general-purpose application programming, but it could be worth creating a proof-of-concept actor model implementation using them.

