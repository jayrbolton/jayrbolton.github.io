title: Algorithms for parsing and factoring boolean expressions
summary: One technique for efficiently flattening nested boolean expressions
date: 2018-10-04 14:18:30
tags: code, algorithms
---

An interesting problem is to take a nested boolean logical expression, such as:

{% raw %}
(A or B) and (C or A and D) or E or F
{% endraw %}

And write an algorithm to factor out all the terms into a flat expression (no parentheses) in an efficient way. For the above expression, we would get 6 total conjunctions joined together with disjunctions (`or` operators):

{% codeblock %}
A and C
 or
A and D
 or 
B and C
 or
B and A and D
 or
E
 or
F
{% endcodeblock %}

In Python, we might want our final value to be a list of lists, where each sublist is a conjunction:

{% codeblock %}
[['A', 'C'], ['A', 'D'], ['B', 'C'], ['B', 'A', 'D'], ['E'], ['F']]
{% endcodeblock %}

It's important to notice is that we can have long chains of terms, such as `A and B or C and D or E and F and G ...` as well as deep nesting, such as `A or (B and (C or (D and (E or ...`.

## Parsing

Before tacking on the challenge of factoring these expressions, let's start by parsing them from plain strings into python lists. One powerful option is to use a library called `parsec`, which originally comes from the Haskell community.

First we declare some basic elements

{% codeblock lang:python %}
import parsec as p

# Stuff to discard
whitespace = p.regex(r'\s+')
ignore = p.many(whitespace)

# A token with all ignore chars ignored
def lexeme(parser):
    return parser.skip(ignore)

# All our basic tokens
lparen = lexeme(p.string('('))
rparen = lexeme(p.string(')'))
symbol = lexeme(p.regex(r'[\d\w_-]+'))
op = lexeme(p.regex(r'(and|or)'))
{% endcodeblock %}

This defines all the basic keywords of the language, such as `and`, `or`, parentheses, and whitespace.

To parse whole nested expressions, we use a generator function with some recursiveness:

{% codeblock lang:python %}
@p.generate('compound expression')
def compound_expr():
    """An expression with multiple terms, and optionally with surrounding parens."""
    yield lparen
    es = yield p.many(expr)
    yield rparen
    return es

# Atoms get parsed into plain strings
atom = op | symbol
expr = atom | compound_expr
program = p.many(expr).skip(ignore)
{% endcodeblock %}

For example, to parse `a or (b and c)`, the following parsers would get called in order:
- `program` on `a or (b and c)`
- `expr`, then `atom` on `a`, yielding  ['a']
- `expr`, then `atom` on `or`, yielding ['a', 'or']
- `expr` on `(b and c)`
- `compound_expr` on `(b and c)`
    - `lparen` on `(` (discarded)
    - `expr`, then `atom` on `b`, yielding ['a', 'or', ['b']]
    - `expr`, then `atom` on `and`, yielding ['a', 'or', ['b', 'and']]
    - `expr`, then `atom` on `c`, yielding ['a', 'or', ['b', 'and', 'c']]
    - `rparen` on `)` (discarded)

Calling `program` as follows:

{% codeblock lang:python %}
parsed = program("a or (b and c or d)", 0)
{% endcodeblock %}

Gives back a result that looks like:

{% codeblock lang:python %}
['a', 'or', ['b', 'and', 'c', 'or', 'd']]
{% endcodeblock %}

We can use this simple form to do our factoring work:

## Factoring

Given an unfactored boolean expression, let's consider our desired output. For an expression such as:

```
(A or B) and (C or A and D) or E or F
```

We ultimately want a list of list of factored terms:

```
[['A', 'C'], ['A', 'D'], ['B', 'C'], ['B', 'A', 'D'], ['E'], ['F']]
```

Where each sublist represents a conjunction (AND operator) of terms. The whole list is a disjunction (OR operator) of conjunctions (as an expression, the list-of-lists looks like `A and C or A and D or B and C or B and A and D or E or F`).

This problem is a great example of a "divide and conquer algorithm", where you can break the problem up into smaller and simpler parts. We can solve this first by:

- Combining a flat set of plain, atomic terms, like "`a and b or c`" into `[[a, b], [c]]`
- Combining pre-converted disjunctions like `[[a], [b]]` and `[[c, d]]` into a single list using either an "`and`" or an "`or`" operator.
    - Combining `[[a], [b]]` and `[[c, d]]` using "`and`" gives us `[[a, c, d], [b, c, d]]`
        - Think of it as factoring "`(a or b) and (c and d)`", giving "`(a and c and d) or (b and c and d)`"
    - Combining `[[a], [b]]`, and `[[c, d]]` using "`or`" gives us `[[a], [b], [c, d]]`
        - Think of it as factoring "`(a or b) or (c and d)`", giving "`a or b or (c and d)`"

### Starting with an easier problem

We want to turn flat, simple expressions into lists of conjunctions. For example:

```
a or b -> [['a'], ['b']]
a and b -> [['a', 'b']]
a and b or c and d -> [['a', 'b'], ['c', 'd']]
```

A few rules immediately come to mind. First, the "`or`" operator seems to append new terms as a new list to the end, creating separate sub-lists. Combining terms with an `and` operator places the terms in the previous sub-list.

- When adding a new term with an "`or`" operation, add a new sub-list with the new term as its only element
- When adding a new term with an "`and`" operation, append the new term to the last sub-list
- When adding the first term, add a new sub-list with the term as the only element

For the `or` combination case, we can write some Python to append the term as a new sub-list:

{% codeblock lang:python %}
def or_combination(disjunction, new_term):
    disjunction.append([term])
    return disjunction
{% endcodeblock %}

While the `and` case appends the term to the last sub-list:

{% codeblock lang:python %}
def and_combination(disjunction, term):
    disjunction[-1].append(term)
    return disjunction
{% endcodeblock %}

We combine the above to functions into a single function that iterates over all terms in a flat expression and converts them into a list of conjunctions

{% codeblock lang:python %}
def expr_to_disjunction(expr):
    mode = 'or'  # start by appending the first term to a new sublist
    result = []
    for term in expr:
        if mode == 'or':
            result = or_combination(result, term)
        elif mode == 'and':
            result = and_combination(result, term)
        else:
            # `term` must be an operator. Set the mode to 'and' or 'or'
            mode = term
    return result
{% endcodeblock %}

### Combining disjunctions

A "disjunction" is a list of conjunctions. For example, the disjunction `[[a], [b, c]]` represents the expression `a or b and c`.

In order to collapse expressions with parentheses, we need to think about how to combine whole disjunctions. For example, say you had:

```
(a or b) and (c or d)
```

Using the code above, we can tackle the two sub-expressions:

```
(a or b) -> [[a], [b]]
(c or d) -> [[c], [d]]
```

Now we can consider how to combine `[[a], [b]]` and `[[c], [d]]` using the "`and`" operator. By using what we know intuitively about factoring expressions (think of `or` as addition and `and` as multiplication), our expected result looks like:

```
[[a, c], [a, d], [b, c], [b, d]]
```

We're doing a pairwise combination of each term from each disjunction, which can be generated with some nested looping:

{% codeblock lang:python %}
[c1 + c2 for c1 in disj1 for c2 in disj2]
{% endcodeblock %}

Where `disj1` in our case is `[[a], [b]]` and `disj2` is `[[c], [d]]`. Incorporating the above code into our `and_combination` function, we get:

{% codeblock lang:python %}
def and_combination(disjunction, term):
    if isinstance(term, list):
        # `term` is a disjunction
        # Combine two disjunctions pair-wise
        return [c1 + c2 for c1 in disjunction for c2 in term]
    else:
        # `term` is an atomic lexeme; append it to the last conjunction in the disjunction
        disjunction[-1].append(term)
        return disjunction
{% endcodeblock %}

What about the `or` case? Say we had:

```
(a and b) or (c and d)
```

Each sub-expression gives us:

```
(a and b) -> [[a, b]]
(c and d) -> [[c, d]]
```

The two sub-expressions get combined into disjunction as:

```
[[a, b], [c, d]]
```

This is a simpler case than the `and` case. We can combine two disjunctions with an `or` operation by simply concatenating them together into one list:

```
disjunction + disjunction2
```

Incorporating that into our `or_combination` function, we get:


{% codeblock lang:python %}
def or_combination(disjunction, term):
    if isinstance(term, list):
        # `term` is a disjunction
        # Combine them together by simple concatenation
        disjunction += term
    else:
        # `term` is an atomic lexeme
        # Append the term as a new sublist
        disjunction.append([term])
    return disjunction
{% endcodeblock %}

Now our `or_combination` and `and_combination` functions can combine atomic lexemes (such as `a` and `b`) as well as fill sub-expressions.

The only thing missing is a function that can actually apply this logic all the way up the tree, stitching everything together. 

We want to process things bottom up, converting the most nested sub-expressions into disjunction lists, and then combine those together as we travel up the tree

### Traversing up the tree

In order to apply a function to every level of the expression tree bottom-up, we can traverse the tree using recursion.

{% codeblock lang:python %}
def traverse_expr(expr, fn):
    if isinstance(expr, str):
        return expr  # base case
    return fn([traverse_lexemes(term, fn) for term in expr])
{% endcodeblock %}

This function applies a given function `fn` to every level of the tree, starting from the bottom and working up. For atomic lexemes, we don't apply the function and simply return the lexeme. This is our base case. 

For example, given the expression `[['a', 'and', 'b'], 'or', ['c', 'and', 'd']]`, `fn` is applied to every list of terms like so:

{% codeblock lang:python %}
fn([fn(['a', 'and', 'b']), 'or', fn(['c', 'and', 'd'])])
{% endcodeblock %}

We can pass our `expr_to_disjunction` function as `fn`:

{% codeblock lang:python %}
disjunction = traverse_expr(expr, expr_to_disjunction)
{% endcodeblock %}

This gives us our final, correct result. To understand why, let's take a full example, starting with a string expression:

{% codeblock lang:python %}
string = "(a or b) and (c or d and e)"
{% endcodeblock %}

We first parse this into lists of lexemes:

{% codeblock lang:python %}
expr = program(0, string)
# -> [['a', 'or', 'b'], 'and', ['c', 'or', 'd', 'and', 'e']]
{% endcodeblock %}

Then we traverse the tree bottom-up and apply `expr_to_disjunction` at every level:

{% codeblock lang:python %}
result = traverse_expr(expr, expr_to_disjunction)
{% endcodeblock %}

`result` will be `[['a', 'c'], ['a', 'd', 'e'], ['b', 'c'], ['b', 'd', 'e']]`

Every step of the way, starting with `[['a', 'or', 'b'], 'and', ['c', 'or', 'd', 'and', 'e']]`

* Apply `expr_to_disjunction` to each sub-expression
* -> `[expr_to_disjunction(['a', 'or', 'b']), 'and', ['c', 'or', 'd', 'and', 'e']]`
* -> `[[['a'], ['b']], 'and', ['c', 'or', 'd', 'and', 'e']]`
* -> `[[['a'], ['b']], 'and', expr_to_disjunction(['c', 'or', 'd', 'and', 'e'])]`
* -> `[[['a'], ['b']], 'and', [['c'], ['d', 'e']]]`
* Apply `expr_to_disjunction` to the whole expression
* -> `expr_to_disjunction([[['a'], ['b']], 'and', [['c'], ['d', 'e']]])`
* -> `[['a', 'c'], ['a', 'd', 'e'], ['b', 'c'], ['b', 'd', 'e']]`
