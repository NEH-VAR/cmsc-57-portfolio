# COUNTING

## Introduction 


**Counting** is a fundamental concept in discrete mathematics, essential for analyzing arrangements, selections, and distributions of objects. This topic is divided into five interconnected subtopics:  

**Basics of Counting**
   - Introduces foundational principles like the *Product Rule* and *Sum Rule* to count ways to perform tasks or make choices.  

**Pigeonhole Principle**
   - States that if objects are distributed into containers, at least one container must hold multiple objects under certain conditions.  

**Permutation and Combination**
   - **Permutations**: Ordered arrangements (e.g., competition rankings).  
   - **Combinations**: Unordered selections (e.g., lottery numbers).  

**Generalized Permutations and Combinations**
   - Extends counting to scenarios with repetition or indistinguishable objects.  
 
**Generating Permutations and Combinations**
   - Algorithms to systematically list all possible arrangements (e.g., lexicographic order).  


These tools solve problems in computer science (e.g., algorithms), probability (e.g., event counting), and optimization (e.g., resource allocation).  

## Learnings

These are the foundational ideas, definitions, and methods I have’ve grasped from the topic Counting.

### 🧮 Basics of Counting

####  What is Combinatorics?

Combinatorics is a part of math that deals with counting things—like how many different ways you can arrange or choose items.

#### Product Rule

If you have to do two tasks, and:
> Task 1 can be done in n₁ ways <br>
> Task 2 can be done in n₂ ways  

Then the total number of ways to do both is:
$$ n₁ × n₂$$

The tasks requires a sequence of steps, the total ways is the product of choices at each step.

#### Sum Rule

If you can do a task in one of n₁ ways or one of n₂ ways, and the options don’t overlap,
Then the total number of ways is:
 $$n₁ + n₂$$

Tasks are mutually exclusive (cannot happen simultaneously), the total ways to do either task is the sum of their individual ways.

#### Subtraction Rule (Inclusion–Exclusion)

If two sets of options overlap, count them like this:
$$(\text{Ways in } A) + (\text{Ways in } B) - (\text{Ways in both } A \text{ and } B)$$

#### Tree Diagrams

Draw a branching diagram to show all possible outcomes step-by-step.
Each full path from root to leaf shows a unique result.

![TreeDiagram](/files/Counting/TreeDiagram.png)

---

### 🕳️ Pigeonhole Principle

####  What is the Pigeonhole Principle?

If you put more items than containers, at least one container will have more than one item.

#####  Classic Example:

If you place 10 pigeons into 9 holes,
at least one hole must contain 2 pigeons.

![PigeonHole](/files/Counting/Pigeonhole.jpg)

#### Why it Works (The Logic)

> If you try to give each container only one item...<br>
> But you have more items than containers...<br>
> Then it’s impossible—some containers must share. <br>

This is called a proof by contradiction.

#### Set Version of the Principle

If you try to match $k+1$ or more items to k unique values,
you can’t keep them all unique—
at least one value will be repeated.

This means the function can’t be one-to-one.

#### The Generalized Pigeonhole Principle

If you have n items and k containers,
then at least one container has at least ⌈n/k⌉ items.
 $$⌈x⌉ = \text{round x up to the next whole number (ceiling)}$$

---

### 🗝️ Permuatation and Combinations

#### 1. **Permutations (Order Matters)**
- **Definition**: Arrangements of items where the order is important. 
- **Formula**:  For `n` distinct items, the number of ways to arrange `r` items:
$$P(n, r) = \frac{n!}{(n - r)!}$$

---

#### 2. **Combinations (Order Doesn’t Matter)**
- **Definition**: Selections of items where order doesn’t matter.  
- **Formula**: For `n` distinct items, the number of ways to choose `r` items:  
 $$C(n, r) = \frac{n!}{r!(n-r)!}$$
---
#### 3. Generalized Cases (Repetition/Indistinguishable Items)

- **Permutations with Repetition**:
  - Items can repeat (e.g., PIN codes)
  - Formula: $$Ways = n^r$$

- **Combinations with Repetition**:
  - Items can repeat, and order doesn't matter (e.g., picking 5 fruits from 3 types)
  - Formula: $$Ways = C(n + r - 1, r)$$

- **Indistinguishable Items**:
  - Items are identical (e.g., arranging the word "SUCCESS")
  - Formula: $$Ways = \frac{n!}{n_1! \times n_2! \times \cdots \times n_k!}$$

---

#### 4. Generating Permutations & Combinations

##### 1. **Lexicographic Order (Dictionary Order)**

- **What it is**: Listing permutations in "alphabetical" order (e.g., 123, 132, 213, ...).  
 - **Key Rule**:  
  Find the first digit that can be increased, swap it with the next higher digit, then sort the rest.  

  **Example**:  
  Next permutation after `234156` → `234165`.

##### 2. **Algorithm for Next Permutation**

1. **Find the pivot**:  
   Rightmost digit smaller than its neighbor (`5` in `362541`).
2. **Swap with successor**:  
   Replace it with the smallest larger digit to its right (`4` in `362541` → swap `2` and `4`).
3. **Reverse the suffix**:  
   Sort the remaining digits in ascending order (`364` + `125` → `364125`).

##### 3. **Generating Combinations**
- **Binary Method**:  
  Treat combinations as bit strings (`1` = include, `0` = exclude). 
  
  **Example**:  
  `1010` = {1st, 3rd} items from {A,B,C,D}.
- **Next Combination Formula**:  
  To get the next combination after `a₁a₂...aᵣ`:  
  1. Find rightmost `aᵢ` that can be increased.  
  2. Increment it and reset subsequent digits.  
  **Example**:  
  Next 3-combination after `{1,2,5}` (from {1,2,3,4,5}) → `{1,3,4}`.

---

## Analysis

Counting isn’t just about numbers—it’s a way to structure choices, possibilities, and even constraints. The Product Rule and Sum Rule taught me that complex problems can be broken into smaller, manageable steps, while the Pigeonhole Principle showed me that some outcomes are inevitable, no matter how you arrange things.  

Permutations and combinations revealed the difference between order and selection—whether sequence matters (like rankings) or not (like teams). The generalized cases expanded this further, proving that repetition and indistinct objects change the game entirely.
  
Generating permutations algorithmically (like lexicographic order) made me see patterns in arrangements, while binary combinations simplified selections into clear yes/no decisions.

---

## Application

Throughout my experiences, I’ve encountered numerous real-world applications of counting principles. For instance, the basics of counting—such as the Product Rule—were exemplified when Steve Harvey explained how pairing 5 differently colored suits with matching pants, 6 shirts with 3 differnt colors creates 75 distinct outfit combinations. Similarly, while building computers, I’ve observed how the interplay of the Sum and Product Rules applies: though not all components are compatible, calculating the total viable configurations involves multiplying choices for compatible parts (Product Rule) while excluding invalid pairings (Sum Rule). Permutations and Combinations, though less overt in daily life, also play a role. Door keys, for example, rely on permutations—unique groove depths and sequences—to ensure security. Meanwhile, Combinations govern unordered selections, like Steve Harvey’s outfit example, where the order of clothing items doesn’t alter the outcome. These principles, though often unnoticed, underpin many practical systems and decisions.

---

## Reflection

At first, counting principles felt like abstract math rules—useful for problems, but distant from my life. But the more I paid attention, the more I saw their quiet influence on my decisions.

Take my wardrobe: I don’t want clutter; I want smart choices. That black long sleeve I bought? Cheap, simple, but layers perfectly with anything. It’s the Product Rule in action—maximizing combinations with minimal pieces. Every time I mix-and-match it effortlessly, I feel a little victory, like I’ve outsmarted the need for excess.

Building my PC taught me the stakes of counting, too. One wrong pick (AMD vs. Intel) could cascade into incompatible parts and wasted money. The Sum and Product Rules weren’t just formulas—they were my checklist to avoid costly mistakes. Crossing out invalid options felt like dodging bullets, and the final boot-up? Pure relief.

Even keys surprised me. Two might look identical, but tiny grooves decide whether they lock or unlock safety. That precision—how something so small guards something so important—made me notice other "tiny details with big impacts" in life. A master key’s power to open multiple doors? It’s like finding a single solution that elegantly solves many problems.

These moments made me realize: counting isn’t just about numbers. It’s a mindset—spotting patterns, avoiding pitfalls, and finding satisfaction in the right combinations. Whether it’s clothes, tech, or even keys, the principles quietly shape my choices, and now? I can’t unsee them.

---

## References

-    CMSC 57 Lecture Slides
- Tree Diagram: https://www.nagwa.com/en/explainers/570140802731/
- Pigeon Hole: https://www.istockphoto.com/illustrations/pigeon-hole-illustrations