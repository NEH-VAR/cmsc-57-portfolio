# DISCRETE PROBABILITY

## Introduction

**Discrete probability** deals with the likelihood of events that have distinct, countable outcomes. It’s a tool for quantifying uncertainty in scenarios like games, algorithms, or decision-making. This topic breaks down how to assign probabilities, handle dependencies between events, and model repeated trials—all while keeping calculations grounded in real-world logic.

---

## Learnings

Here’s what I’ve learned about discrete probability:

### Assigning Probabilities  
- **Basic Idea**: The probability of an event \( E \) is the fraction of favorable outcomes out of all possible outcomes \( S \).  
  Formula:  
  $$ P(E) = \frac{\text{Number of outcomes in } E}{\text{Total outcomes in } S} $$  
- **Rules**:  
  - Probabilities range from 0 (never happens) to 1 (always happens).  
  - The sum of probabilities for all possible outcomes must equal 1.  

---

### Complements and Unions  
1. **Complements**:  
   - The probability that event \( E \) *doesn’t* happen is:  
     $$ P(\text{not } E) = 1 - P(E) $$  

2. **Union of Events**:  
   - For events \( A \) and \( B \), the probability that *either* occurs is:  
     $$ P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B) $$  
   - If \( A \) and \( B \) can’t happen together, this simplifies to:  
     $$ P(A \text{ or } B) = P(A) + P(B) $$  

---

### Conditional Probability  
- **Definition**: The chance of event \( E \) happening *given* that event \( F \) has already occurred.  
  Formula:  
  $$ P(E \mid F) = \frac{P(E \text{ and } F)}{P(F)} $$  
- **Interpretation**: Updates the probability of \( E \) based on new information from \( F \).  

---

### Independence  
- Two events \( E \) and \( F \) are **independent** if:  
  $$ P(E \text{ and } F) = P(E) \times P(F) $$  
- **Meaning**: Knowing \( F \) happened gives no clue about \( E \), and vice versa.  

---

### Bernoulli Trials and Binomial Distribution  
- **Bernoulli Trial**: An experiment with exactly two outcomes: *success* (probability \( p \)) or *failure* (probability \( 1-p \)).  
- **Binomial Distribution**: Counts successes in \( n \) independent Bernoulli trials.  
  Probability of \( k \) successes:  
  $$ P(k) = C(n, k) \times p^k \times (1-p)^{n-k} $$  

---

### Random Variables  
- **Definition**: A function that assigns a real number to each outcome in a sample space.  
- **Example**: Rolling a die? The outcome (1–6) is a random variable.  

---

### Bayes’ Theorem  
- **Purpose**: Refines the probability of an event \( F \) after accounting for new evidence \( E \).  
  Formula:  
  $$ P(F \mid E) = \frac{P(E \mid F) \times P(F)}{P(E)} $$  
- **Use Case**: Reverses conditional probabilities (e.g., diagnosing a disease from test results).  

---

## Analysis  

Discrete probability isn’t just about numbers—it’s a way to measure uncertainty in clear, logical steps. Assigning probabilities taught me that even randomness has structure, while complements and unions showed how events interact, sometimes overlapping, sometimes canceling each other out.

Conditional probability made me realize how new information changes what’s likely—like updating beliefs when facts shift. Independence, on the other hand, revealed when events don’t influence each other at all, simplifying predictions.

Bernoulli trials and binomial distributions turned repeated actions (like coin flips) into predictable patterns, and random variables gave me a way to quantify outcomes beyond just "win" or "lose." Bayes’ Theorem stood out as a tool to reverse reasoning—starting with an effect and working back to its cause.

---

## Application  
Probability governs many everyday situations, often in ways we might not immediately recognize. Basic probability applies to simple actions like rolling a die (where the chance of landing on a specific number is 1/6) or flipping a coin (with a 50% probability for heads). Complements model the inverse of an event—for example, the likelihood of not rolling a 5 on a die is 5/6. Unions combine probabilities, such as calculating the chance of picking either a chip or a cookie from a vending machine with 10 chip varieties and 8 cookie varieties, where 3 chips overlap as "cookie-like" treats. Conditional probability updates predictions based on new information, like estimating the chance of arriving at school wet given a 60% probability of rain and an 80% chance of getting wet if it rains. Independence describes unrelated events, such as my phone dying and my motorcycle tire deflating simultaneously. Bernoulli trials appear in binary outcomes, like a basketball player making or missing a free throw, while the binomial distribution extends this to count successes over multiple trials (e.g., total free throws made in a game). Random variables assign numerical values to outcomes, such as guessing scores on a multiple-choice test. Finally, Bayes’ Theorem refines predictions with evidence, like a smartphone keyboard suggesting the next word ("morning") after typing "how are you doing this." These concepts, though abstract, underpin practical decision-making and problem-solving.

---

## Reflection  

I remember one time I decided not to wear my raincoat because it felt annoying—too bulky, too hot. I thought, "Eh, it probably won’t rain anyway." But halfway to school, the sky just opened up. No shelters around, no way to avoid it. I got completely soaked. Later, I realized if I’d just worn the raincoat, even though it’s not perfect (some water still seeps in), my chances of staying dry would’ve been way higher—maybe 80% instead of 0%.

Another small but funny thing is my phone’s keyboard. When I type "Goodnight," it already predicts the name I usually text next. At first, it felt like magic, but now I see it’s just probability—my past habits teaching my phone what’s likely to come next.

These little moments made me realize something: probability isn’t just math. It’s about making smarter choices. Ignoring it means more surprises (like getting drenched). Paying attention? Things just... flow better. Less stress, fewer "I should’ve known" moments. Now, I try to notice those hidden odds—not to overthink everything, but to give myself an easier time. Life’s unpredictable, but sometimes, the clues are already there. I just have to use them.

---

## References  
- CMSC 57 Lecture Notes