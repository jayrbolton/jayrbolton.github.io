title: "On general AI: we're not really close"
summary: Some reasons why general AI is still out of reach
date: 2016-12-26 17:03:49
tags:
---

Recently, discussion has been building that general AI is on the horizon. We've also seen a lot of hype about how dangerous to humanity such an AI could be. Many TED talks, online magazines, podcasters, etc. have focused on this topic, become bullish on its potential, and embraced the alarmism.

I would argue that we are not remotely close to any kind of general AI, or any kind of brain simulation, because we have not figured out any paradigm that could fit the bill. Predicting that current computers will produce general AI is like predicting that a tractor could go to the moon. The fundamental parts simply aren't there.


First: what is "general" AI? Roughly speaking, it is a computer that can perform intellectual tasks with at least as much versatility and speed as any human. If the computer cannot currently perform some task, then it could learn to do so or design another computer that could do it. The keys here being:

* It can perform any intellectual task that we can
* It can think in human-speed or faster
* It can learn and evolve
* (More optionally and vaguely) It experiences consciousness

The first three points could be well defined and are pretty testable. The last point is trickier, and I won't touch on it here.

Within the category of general AI, you could take two approaches: try to closely mimic the human brain, or try to engineer something that works differently, but can still do the same or greater intellectual work.

In mimicing the human brain, you might follow one of two paths. One is to try to scan and record all the microscopic activity of neurons in the brain and use that data to create a computer-run simulation, with the hope that running the simulation might be equivalent to a real brain. This is most likely an impossible proposition, as I outline later on.

The other path to mimic the human brain would be to understand and model how our actual, computational systems of neurons work. For example, if we are only given data of neural activity, we should be able to deduce what emotion the person is experiencing. This would require a thorough understanding of how our actual systems of neurons produce thought. This is another area that we are very, very far from. None of our current forms of computation or neuroscience can touch this type of understanding.

Finally, we may not need to mimic biological brains, and may achieve general AI through a totally different paradigm. However, we have not yet discovered any kind of computational paradigm that can do one of the most basic components of thought: meta-thinking. 

## Simulating the brain

Discussions around simulating the brain usually imply that we will do it using the current, most widespread computer architecture that we have: the [Von Neumann machine](https://en.wikipedia.org/wiki/Von_Neumann_architecture). This is the paradigm that we use for any type of computer, from supercomputers to refrigerators.

The key components of our computers are a memory register and a central processing unit (CPU). The CPU has a clock that ticks forward (usually extremely fast), and performs arithmetic and logic operations on bits in a sequential order. Everything you experience on a computer -- graphics, audio, games, email -- is actually based on this very simple paradigm.



### Simulation problem 1: parallel time

One limitation of the Von Neumann architecture is the central clock, making every operation sequential. Many AI projects, such as Watson, chain together thousands of CPUs, each with their own separate clock, so they can compute in parallel. However, in the brain, as in any part of physical reality, there is a seemingly infinite amount of activity happening at the microscopic level everywhere, entirely in parallel, without any clocks.

A human brain contains around 100 billion neurons. For each neuron, there are about 10 to 50 glial cells that give them support. This is an unimaginably large number of important parts. Properties of each those cells are changing through time simultaneously and constantly. Even if there is no synaptic firing going on at any one moment, each cell is still constantly moving chemicals and staying active in subtle but important ways.

Now, consider that there are trillions of molecules in each of these cells. Each molecule is also working in parallel, vibrating in continuous and unique ways, interacting with other molecules around themselves, never frozen. 100 billion neurons times roughly 35 glial cells each equals 3,500 billion cells. Accounting for roughly 1 trillion molecules per cell means we have 3500 billion trillion parallel data points to simulate, all happening at once. And that's not even counting the constituent parts of molecules. And, of course, this is a gross oversimplification which leaves out other important workings of the brain, not to mention the rest of the nervous system in the spine and body.

Some of our hardware capabilities actually can start to brush these numbers. We are able to put over a billion transistors on a single Intel i7. However, all those transistors are still governed in sequence by a central clock. If each of those billion components could be freed of a central clock, and somehow compute in parallel, then we might have something closer to a brian. A project from MIT called [RALA](http://rala.cba.mit.edu/) attempts to add this kind of ultra-parallel architecture, with hundreds of thousands of small parallel parts. Nevertheless, the lesson is clear: we need a paradigm shift away from how computers currently work to even begin to think about simulating any microscopic system from real life.

### Simulation problem 2: truncating microscopic data 

When we simulate a system on a computer, we make a model of that system at some scale. For example, sociological models of human behavior map to a much larger scale than does physics. It almost never works to apply macro level models like sociology to the micro, like physics.

In any current simulations of biological structures, such as viruses, they have built a model of some observed behavior at a certain size-scale and no smaller. They cannot simulate these viruses at a molecular level, for example, due to processing (and modelling) limitations. 

Say, for argument's sake, that we were somehow able to simulate a virus down to its very molecules. Would that be more accurate or more true? Where do we stop? If we don't simulate "all the way down", could we truly simulate a virus? What does "all the way down" actually mean, and can we ever peer deep enough into atoms to know everything that is going on? What are we losing if we "cut out" an inconceivable amount of atomic data from our simulation?

For some purposes, we might not care that it is not a "complete" simulation, and it may turn out that we can truncate some of the data. For brains, maybe we can simulate all the neurons and leave out all the glial cells, as they may be more secondary. But it seems easy to wonder: what part of the system will we lose, especially in a system that we are trying to simulate, without having much understanding of how it works?

## Simulation problem 3: continuous time

We could potentially divide time into an infinite number of tiny intervals. We do not know if there is any base indivisibility to time, and it may be infinitely divisible. You can observe the continuous state of a neuron at a timestamp of 1, 1.1, 1.11, 1.111, and 1.1111. Each of these states are slightly different, unique, and it's unclear how "small" this divisibility can go. You can think of this as the time version of the size-scale problem above.

In contrast, computers work in discrete time units that are described as instructions per second, governed by a central clock. Even if we create a very, very fast computer, how much data are we losing in between these discrete instructions, data which exists inside of and affects every cell? No matter how fast our computers are, each processor is still fundamentally sequential, and thus would not be able to simulate a nearly infinite amount of data that occurs in continuous time in a single neuron.

## Building an understanding of neurons

In contrast to brute-force simulations, we may instead try to better understand how large networks of neurons actually work to produce thought. This is a much more promising path, as it could turn into something that we could potentially model on a computer, even if at a very small scale. It is important that building this type of understanding is made from the bottom up, rather than the top down. Bottom up understanding means we would have to understand how neurons work together mechanically to produce thought. The test is to see if we can infer what the thought is by only looking at neural activity. In contrast, top-down research emphasizes broad statistical correlations without any mechanical understanding.

## Bottom-up vs. top-down understanding

Some very basic success we have had in bottom-up understanding is how rod and cone neurons work in the eye. We know that there is a system where cones separately detect red, green, and blue in the center of your vision, while rods detect black-and-white light in the periphery. We also know how properties and electrical pathways of some cells in our eye actually generate our ability to perceive color, form, and motion in different ways. With this basic model, we could potentially take data from a set of cells and begin to infer what the eye is actually looking at without knowing beforehand.

In most medical-oriented studies of the brain, the research is made top-down, by looking at macro data such as from MRIs, creating statistical correlations with what the person is experiencing. For example, we might study what regions of the brain have electrical activity when a person experiences different emotions.

Studying the brain in the top-down way is similar to trying to understand how a computer works by listening to what it sounds like. We notice that when we save a file, the computer makes clicking noises in a certain region. While this is a true observation, it will never give us insight into the programming language of the text editor, the file system tree, how the text is converted into bytes, how 1s and 0s are written by a laser to a metallic disk, etc, etc.

## The biggest wrench in the gears: meta-thinking

Perhaps the biggest obstacle to general AI is not fancy hardware or complicated neuroscience. It's the challenge of getting a computer to perform any kind of unscripted meta-thought. To best understand what I mean, I'll give you an example.

A programmer can easily program a computer to do arithmetic on integers. You can give the computer an arithmetic problem, and it will instantly give the answer. Any human will be embarrisingly slower at the same problem. However, humans are still far more powerful in a much more meaningful way.


A human will discover that when you add two odd numbers together, you will always get an even number. The human can discover this fact without any direct prompt, just by adding a bunch of numbers and intuiting a pattern. The human can even invent a proof of the fact by abstracting what it means for a number to be odd. The computer could never do this kind of meta-thinking. How we might program a computer to spontaneously discover unknown laws about numbers, without being prompted, is a complete mystery.

To make the point more salient, think what would happen if someone painted a yellow line across a highway to confuse autonomous cars. The cars would get instantly stuck, while a human driver would be able to think, "this isn't right, this line is not standard, so I'll drive over it without problem." That thought is pure meta-thinking which a computer can't perform. Sure, you could program the car to ignore non-standard yellow lines on a highway to solve that specific problem. What if someone pretends to be a contruction worker with a stop sign? A fake red light? A private road sign? A computer-driven car would never be able to assess the situation from a meta-level. No matter what specific situations you program the car to handle, a human will always be able to think of another situation to trick the car. That's because humans have meta-thinking, and computers do not.

I would argue that this type of meta-thinking is what drives science, engineering, art, business, and all creative activity, and is an essential ingredient for general AI. If we can figure out how to create this type of thinking in a computer, no matter how rudimentary, then I think we will have achieved a gigantic step in general AI.

## Postscript: machine learning and deep learning

The major recent advancements that have sparked all of the talk about general AI is in machine learning, which is a field of applied statistics. Machine learning has some aesthetic similarities to brains, mostly in its naming and inspiration, but they actually have very little in common. Machine learning, at least in its form of computational statistics, is probably not a pathway to general AI. I might write a follow-up post that contrasts machine learning and real brains. In the mean time, see this post from the Keras blog about **[The limitations of deep learning](https://blog.keras.io/the-limitations-of-deep-learning.html)**.

The more general concept of "machine learning" -- that of a program that can change itself -- is certainly an essential ingredient for general AI, and is possible with current hardware and software. Unfortunately, it's only one piece of the puzzle among countless others.

## Feedback

Thoughts? Email me at jayrbolton at gmail dot com
