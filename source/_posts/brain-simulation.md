title: Simulating the human brain is impossible
summary: Some technical and ontological points arguing why we cannot simulate brains (or any piece of reality) using computers
date: 2016-12-26 17:03:49
tags:
---

Simulating a human brain on a computer (or any biological brain) is impossible within current computer architectures. There are a few basic ontological and technical reasons that our current hardware paradigm does not map to the workings of a brain, in some very fundamental ways. This also reveals that making any _true_ simulation of any piece of reality is impossible.

By "current computer architectures", I mean the [Von Neumann machine](https://en.wikipedia.org/wiki/Von_Neumann_architecture) that sequentially performs operations on a memory register. Fundamentally, all our computers have this same architecture, and it is only a question of speed and scale. More obscure variations of working computer architectures still don't even come close to how the brain works at a basic level. And yes, I am accounting for massive improvements in speed, parallel computing, and memory, even to very large orders of magnitude.

## Parallel time problem

A human brain contains around 100 billion neurons. For each neuron, there are about 10 to 50 glial cells that give them support. This is an unimaginably large number of important parts. Properties of each those cells are changing through time simultaneously and constantly. Even if there is no synaptic firing going on at any one moment, each cell is still constantly moving chemicals and staying active in subtle but important ways.

Now, consider that there are trillions of molecules in each of these cells. Each molecule is also working in parallel, vibrating in continuous and unique ways, interacting with other molecules around themselves, never frozen. 100 billion neurons times roughly 35 glial cells each equals 3,500 billion cells. Accounting for roughly 1 trillion molecules per cell means we have 3500 billion trillion parallel data points to simulate, all happening at once. And that's not even counting the constituent parts of molecules. And, of course, this is a gross oversimplification which leaves out other important parts of the workings of the brain.

CPUs, on the other hand, process information sequentially by moving bits in memory registers, which can be parallelized by adding more CPUs. Even considering a massively parallel computing grid, or considering all the running CPUs in the world, we fundamentally do not come close to the type of numbers described above for a single brain, or even a single cell. What physical scale would we require to have a billion trillion parallel CPUs?

## Size-scale problem

Simulations are algorithmic models. Models are mathematical descriptions of specific data and are mostly bound to a certain size-scale. For example, sociological models of human behavior map to a much larger scale than does physics. It almost never works to apply macro level models like sociology to the micro, like physics.

In any current simulations of biological structures, such as viruses, they have built a model of the life-form's observed behavior at a certain size-scale and no smaller. They cannot simulate these viruses at a molecular level, for example, due to processing (and modelling) limitations. But say we somehow were able to simulate the virus down to its very molecules. Would that be more accurate or more true? Where do we stop? If we don't simulate "all the way down", could we truly simulate a virus? What does "all the way down" actually mean, and can we ever peer deep enough into atoms to know everything that is going on? What are we losing if we "truncate" a potentially gigantic amount of atomic data from our simulation?

For some purposes, we might not care that it is not a "true" simulation, and care only that it is consistent with our observed data of the real thing. But for the human brain, it's much easier to wonder: what would we be losing in a simulation that discards so much data?

If you accept that life is an emergent system from a multitude of complexity, wherein small parts combine in certain ways that give rise to larger patterns, then we cannot simply discard those small parts.

(I should note that even simulating a cell is currently very implausible; we still do not understand some of the basic mechanics of DNA replication, for example)

## Continuous time problem

Time in reality is effectively continuous. We do not know if there is any base indivisibility to time, and it may be infinitely divisible.

You can observe the continuous state of a neuron at a timestamp of 1, 1.1, 1.11, 1.111, and 1.1111. Each of these states are slightly different, unique, and it's unclear how "small" this divisibility can go.

In contrast, our computers _fundamentally_ work in discrete time units that are described as _instructions per second_. Even if we create a very, very fast computer, how much data are we losing in between these discrete instructions, data which exists inside of and affects every cell? No matter how fast our computers are, each processor is still fundamentally sequential, and thus would not be able to simulate a nearly infinite amount of data that occurs in continuous time in a single neuron.

Similar to the size-scale problem, are we willing to "truncate" this continuous time data, and would the results be anything like a human brain, or any other piece of reality?


# Conclusion

If we can't create a _true_ simulation of a brain, or even of any piece of reality, with our current computer architecture, then can we instead create an adequate algorithmic approximation that can effectively model the observed data of a human brain? Unlike the idea of a _true_ simulation, this type of approximation might be technically possible.

But would that approximation of a brain be conscious? 
(The hard part of trying to build something with the goal of creating consciousness is that the goal itself is totally undefined. You cannot reach a goal that isn't defined.)

Would we be content to "copy" ourselves to such a simulation, knowing it is not a true simulation and only an approximation, especially when we cannot know if it is conscious?

