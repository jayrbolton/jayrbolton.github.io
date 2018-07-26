title: "On the impossibility of general AI"
summary: Some reasons why general AI is currently out of reach.
date: 2016-12-26 17:03:49
tags: ai
---

Recently, discussion has been building that general AI is on the horizon. We've also seen a lot of hype about how dangerous to humanity such an AI could be. Many TED talks, online magazines, podcasters, etc. have focused on this topic, become bullish on its potential, and embraced the alarmism.

Predicting that current computers will produce general AI is like predicting that a tractor could go to the moon. The fundamental parts simply aren't there.

General AI is a computer that can perform intellectual tasks with at least as much versatility and speed as any human. If the computer cannot currently perform some task, then it could learn to do so or design another computer that could do it. The keys here being:

1. It can perform any intellectual task that we can
2. It can compute data in human-speed or faster
3. It can learn and evolve
4. (More optionally and vaguely) It experiences consciousness

The first three points are concrete and fairly testable. I won't touch on the last point here.

Points 1 and 2 are already here, and have been here for many years. The problematic point is number 3, requiring computers to have a capability for novel and spontaneous invention.

## Approaches

On the path to general AI, you could take a couple approaches: try to closely mimic the human brain, or try to engineer something that works differently, but can still do the same or greater intellectual work.

### Mimicing the brain

In mimicing the human brain, you might follow one of two paths. One is to try to scan and record all the microscopic activity of neurons in the brain and use that data to create a computer-run simulation, with the hope that running the simulation might be equivalent to a real brain. This is most likely an impossible proposition, as I outline later on.

The other path would be to create a theory and computational paradim that models how our actual, computational systems of neurons work. As a test, if we are only given data of neural activity, we should be able to deduce what feelings the person is having. This would require a thorough understanding of how systems of neurons produce thought. This is another area that we are very, very far from. None of our current forms of computation or neuroscience are close to this type of understanding.

Finally, we may not need to mimic biological brains, and may achieve general AI through a totally different paradigm. However, we have not yet discovered any kind of computational paradigm that can do one of the most basic components of thought: meta-thinking. 

The state of the art in simulating a real brain is the Blue Brain project: 

> 

### Simulating the brain

Discussions around simulating the brain usually imply that we will do it using the current, most widespread computer architecture that we have: the [Von Neumann machine](https://en.wikipedia.org/wiki/Von_Neumann_architecture). This is the paradigm that we use for any type of computer, from supercomputers to refrigerators.

The key components of our computers are a memory register and a central processing unit (CPU). The CPU has a clock that ticks forward (usually extremely fast), and performs arithmetic and logic operations on bits in a sequential order. Everything you experience on a computer -- graphics, audio, games, email -- is actually based on this very simple paradigm.

#### Simulation problem 1: parallel time

One limitation of the Von Neumann architecture is the central clock, making every operation sequential. Many AI projects, such as Watson, chain together thousands of CPUs, each with their own separate clock, so they can compute in parallel. However, in the brain, as in any part of physical reality, there is a seemingly infinite amount of activity happening at the microscopic level everywhere, entirely in parallel, without any clocks.

A human brain contains around 100 billion neurons. For each neuron, there are about 10 to 50 glial cells that give them support and have been recently found to have [much more cognitive function than we first realized](https://www.scientificamerican.com/article/the-root-of-thought-what/). This is an unimaginably large number of important parts running in parallel. Properties of each those cells are changing through time simultaneously and constantly. Even if there is no synaptic firing going on at any one moment, each cell is still constantly moving chemicals and staying active in subtle but important ways.

Now, consider that there are trillions of molecules in each of these cells. Each molecule is also working in parallel, vibrating in continuous and unique ways, interacting with other molecules around themselves, never frozen. 100 billion neurons times roughly 35 glial cells each equals 3,500 billion cells. Accounting for roughly 1 trillion molecules per cell means we have 3500 billion trillion parallel data points to simulate, all happening at once. And that's not even counting the constituent parts of molecules. And, of course, this is a gross oversimplification which leaves out other important workings of the brain, not to mention the rest of the nervous system in the spine and body, [which is more essential than we realize for any working brain](http://brainsciencepodcast.com/bsp/2018/biological-mind-with-alan-jasanoff-bs-146).

Some of our hardware capabilities actually can start to brush these numbers. We are able to put over a billion transistors on a single Intel i7. However, all those transistors are still governed in sequence by a central clock. If each of those billion components could be freed of a central clock, and somehow compute in parallel, then we might have something closer to a brian. A project from MIT called [RALA](http://rala.cba.mit.edu/) attempts to add this kind of ultra-parallel architecture, with hundreds of thousands of small parallel parts. Older attempts at ["connection machines"](https://en.wikipedia.org/wiki/Connection_Machine) had similar goals, but didn't pan out. Nevertheless, the lesson is clear: we need a paradigm shift away from how computers currently work to even begin to think about brain simulation.

#### Simulation problem 2: truncating microscopic data 

When we simulate a system on a computer, we make a model of that system at some scale. For example, sociological models of human behavior map to a much larger scale than does physics. It almost never works to apply macro level models like sociology to the micro, like physics.

In any current simulations of biological structures, such as viruses, they have built a model of some observed behavior at a certain size-scale and no smaller. They cannot simulate these viruses at a molecular level, for example, due to processing (and modelling) limitations. 

Say, for argument's sake, that we were somehow able to simulate a virus down to its very molecules. Would that be more accurate or more true? Where do we stop? If we don't simulate "all the way down", could we truly simulate a virus? What does "all the way down" actually mean, and can we ever peer deep enough into atoms to know everything that is going on? What are we losing if we "cut out" an inconceivable amount of atomic data from our simulation?

For some purposes, we might not care that it is not a "complete" simulation, and it may turn out that we can truncate some of the data. For brains, maybe we can simulate all the neurons and leave out all the glial cells, as they may be more secondary. But it seems easy to wonder: what part of the system will we lose, especially in a system that we are trying to simulate, without having much understanding of how it works?

#### Simulation problem 3: continuous time

We could potentially divide time into an infinite number of tiny intervals. We do not know if there is any base indivisibility to time, and it may be infinitely divisible. You can observe the continuous state of a neuron at a timestamp of 1, 1.1, 1.11, 1.111, and 1.1111. Each of these states are slightly different, unique, and it's unclear how "small" this divisibility can go. You can think of this as the time version of the size-scale problem above.

In contrast, computers work in discrete time units that are described as instructions per second, governed by a central clock. Even if we create a very, very fast computer, how much data are we losing in between these discrete instructions, data which exists inside of and affects every cell? No matter how fast our computers are, each processor is still fundamentally sequential, and thus would not be able to simulate a nearly infinite amount of data that occurs in continuous time in a single neuron.

## Building an understanding of neurons

In contrast to brute-force simulations, we may instead try to better understand how biological neural networks actually work to produce thought. This is a much more promising path, as it could turn into something that we could potentially model on a computer, even if at a very small scale. It is important that building this type of understanding is made from the bottom up, rather than the top down. Bottom up understanding means we would have to understand how neurons work together mechanically to produce thought as an emergent phenomenon, while top-down research emphasizes broad statistical correlations without any mechanical understanding.

We still have a long ways to go towards this type of understanding. In the introduction of Blue Brain's 2016 paper, [Reconstruction and Simulation of Neocortical Microcircuitry](https://web.stanford.edu/class/cs379c/archive/2016/calendar_invited_talks/articles/MarkrametalCELL-15.pdf), they outline some of our current lack of understanding:

> For example, it is known that different types of neurons are connected through synapses with different dynamics and strengths, strategically positioned at different locations on the neurons’ dendrites, somata, and axons, but the functional significance of this organization remains unclear. Computational approaches that abstract away this level of biological detail have not been able to explain the functional significance of such intricate cellular and synaptic organization

### Bottom-up vs. top-down understanding

Some very basic success we have had in bottom-up understanding is how rod and cone neurons work in the eye. We know that there is a system where cones separately detect red, green, and blue in the center of your vision, while rods detect black-and-white light in the periphery. We also know how properties and electrical pathways of some cells in our eye actually generate our ability to perceive color, form, and motion using different mechanisms. With this basic model, we could potentially take data from a set of cells and begin to infer what the eye is actually looking at without knowing beforehand.

In most medical-oriented studies of the brain, the research is made top-down, by looking at macro data from MRIs, creating statistical correlations with what the person is experiencing. For example, we might study what regions of the brain have electrical activity when a person experiences different emotions. Studying the brain in the top-down way is similar to trying to understand how a computer works by listening to what it sounds like. We notice that when we save a file, the computer makes clicking noises in a certain region. While this is a true observation, it will never give us insight into the programming language of the text editor, the file system tree, how the text is converted into bytes, how 1s and 0s are written by a laser to a metallic disk, etc, etc.

## Building our own paradigm

### Machine learning

Deep neural networks have received a lot of attention lately for solving problems that used to be very hard for computers, but are easier for humans, such as image recognition or game playing. They are a very powerful advancement in computational modelling, and allow us to get a handle over huge amounts of data.

Part of the attention around deep neural networks likely stems from their name, which implies that they are some kind of simulation of our minds. However, neural networks only have a very vague and loose connection to our brains, in that they have a highly connected graph of nodes with a "threshold" (an activation function). Otherwise, they don't share any other similarites to biological neurons. A neural network's system of "feeding forward" and "back propagation" do not relate to any function in the brain, and are [more of a mechanism of calculus]().

An interesting [blog post from a machine learning toolset called Keras](https://blog.keras.io/the-limitations-of-deep-learning.html) outlines many of the limitations of neural networks.

> Here's what you should remember: the only real success of deep learning so far has been the ability to map space X to space Y using a continuous geometric transform, given large amounts of human-annotated data. Doing this well is a game-changer for essentially every industry, but it is still a very long way from human-level AI.

Another interesting form of machine learning that receives less attention is genetic algorithms. In a genetic algorithm, you can start with a set of code that performs badly, and run it over and over, measuring its success. Every time you run it, you randomly change some small part of the code and track how well or badly it does. The times that it does well, then those random changes. 

#### Vehicles

In the 1986 book [Vehicles](https://mitpress.mit.edu/books/vehicles), Valentino Braitenberg lays out a system that combines an older form of neural networks (more similar to early "perceptrons"), combined with a system of natural selection to "grow" neural networks. His ideas around neural feedback loops, thresholds, and directional wiring are the most compelling example to me of a paradigm that might produce general AI. We don't know how any of his rules would result in general AI, exactly, but just that it may arise as an emergent phenomenon at some point when the system grows large and tangled enough. 

Therein lies the difficulty, however. It may be the case that we can "grow" a huge and tangled web of neuron-like nodes that give rise to some strange form of general AI, but the problem is that the network is so large and tangled that we cannot know *why* it emerged.

### The impossibility of machine-originated invention

Perhaps the biggest obstacle to general AI is not fancy hardware or complicated neuroscience. It's the challenge of getting a computer to perform any kind of unscripted meta-invention.

For example, a programmer can easily program a computer to do arithmetic on integers. You can give the computer an arithmetic problem, and it will instantly give the answer. Any human will be embarrisingly slower at the same problem. However, humans are still far more powerful in a much more meaningful way.

A human can discover that when you add two odd numbers together, you will always get an even number. This is an ability to "jump out" of the closed system of arithmetic and look at **patterns of the system**, without being told to do so. The human can even invent a proof of the fact by **abstracting out** a definition that described all odd numbers.

How do we get a computer to do unprompted pattern finding and abstraction? Currently, we have to very specifically program the computer to do any task, using a specific sets of annotated data, and we must already have fairly clear ideas of the results we want. How we can get a computer to invent ideas is still unclear.

This type of meta-thinking drives science, engineering, art, business, and all creative activity, and is likely a fundamental property of general AI.

## Feedback

Email jayrbolton at gmail dot com
