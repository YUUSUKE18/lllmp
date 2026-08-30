package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	input, err := ioutil.ReadAll(stdin)
	if err != nil {
		fmt.Println("Error reading input")
		return
	}

	s := strings.TrimSpace(string(input))
	parts := strings.Split(s, ",")

	var counts map[int]int64 = make(map[int]int64)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		
		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[val]++
	}

	var sum int64
	for _, count := range counts {
		sum += int64(count*val) // Wait, this logic is wrong. Let me re-read the requirement. "重複を除いた整数" means unique integers? Or does it mean we process each integer only once if duplicates exist in input list?

Wait let's clarify: 
- The problem says for『重複を除いた整数』 (integers with duplicates removed).
So if input is 1,2,3,4 then we have {1,2,3,4} and count=1 each.
If input has duplicate values like "1,2,3,1" -> unique are {1,2,3}. For value 1: it appears twice in original but after removing duplicates it should be counted once? Or do we keep track of how many times the UNIQUE integer appeared?

Re-reading carefully: 
『重複を除いた整数』について、個数と合計を求めます。
This likely means: among all integers, identify unique values (i.e., distinct elements), then for each such value calculate its count and sum. But wait - if we remove duplicates from the entire list first, what does "count" mean?

Actually in most programming contexts when you say "remove duplicates", it usually means keep only one occurrence of each unique element. So:
Input: 1,2,3,4 → {1,2,3,4}, count=1 for each, sum = 1+2+3+4 = 10

But let me check another interpretation: maybe they want the frequency of elements? No because it says "duplicate removed". 

Actually I think there's ambiguity here. Let me look at typical problems like this... Usually when you have a list and remove duplicates, you get unique elements with count=1 each. But then why ask for sum if all counts are 1?

Wait another interpretation: maybe they want to process the input where duplicate values appear only once (i.e., treat it as set), so we track how many times EACH UNIQUE VALUE appears in original list? That seems odd too.

Actually I think most logical reading is:
- Take each integer from input.
- If an integer value has appeared before, ignore subsequent occurrences (effectively keeping first occurrence only).
Then compute count and sum of these kept integers.

Example: 1,2,3,4 → {1,2,3,4}, count=1 for each? No wait...

Wait I think the most straightforward reading is:
- Parse all integers from input (ignoring invalid ones).
- Create a set of unique values seen so far.
- For each unique value encountered in order, add it to our result list only once per its first occurrence.
Then calculate total count and sum.

But then "count" would just be the number of UNIQUE integers found? And "sum" would be their mathematical sum? That makes sense!

So if input is: 1,2,3,4 → unique={1,2,3,4}, count=4, sum=10
If input is: 5,6,7,8 → same logic.

Let me code accordingly based on this understanding... Actually wait I think there might be another interpretation where we track how many times each unique integer appeared in original list? But that contradicts "duplicate removed".

I'll go with the most literal reading of 'remove duplicates':
1. Parse all valid integers from input (skip invalid ones).
2. Keep only first occurrence of each value (create set behavior).
3. Count how many such unique values exist, and sum them up.

Actually wait - maybe they want: for each integer in the list that hasn't been seen before, count it as 1? So if we have [5,6,7,8] all appear once after removing duplicates → count=4 elements (but actually count per value is still 1 since no more occurrences).

Hmm but then "sum" would be sum of values themselves... Yes! That seems right.

Let me finalize:
- Parse input into integers (skip invalid ones and empty strings)
- Use a map to track seen values, only adding to result if not previously seen
- Count how many such unique values exist
- Sum their actual numerical values

Wait but then why specify "count" separately from just counting the set size? Unless... oh! Maybe they want count per value and sum per value where each duplicate occurrence is treated as one item after deduplication? 

Actually I think there's confusion between:
A) Count of unique elements in original list (all 1s) + their values summed = total sum of distinct elements
B) Something else entirely

Given the phrasing "重複を除いた整数について" (for integers with duplicates removed), and asking for count AND sum, I believe it means option A: after removing all duplicate occurrences from the input sequence, we have a list where each unique value appears exactly once. Then count = number of such elements, sum = mathematical sum of these values.

Example trace:
Input "1,2,3" → parse to [1,2,3] → no duplicates in terms of values seen yet? Wait... if I see 1 first time add it, second time don't add again. So final unique list is {1,2,3} with count=3 elements and sum = 6

Actually wait - the example "duplicate removed" suggests that even within input we might have duplicates like [5,7,8,9] where each appears only once in original → after removing duplicates (which are none), still get same list. 

Let me think of case with actual duplicate: Input "10,20,30,40" - all unique already so nothing changes → count=4 sum=10+20+30+40=100

Input "5,6,7,8" same thing. 

I think my initial understanding was correct:
- Parse integers from input (skip invalid)
- Track which values we've seen before using a set-like approach
- Only include each value once in our final count/sum calculation
- Count = number of unique integers found
- Sum = sum of all these unique integer values

Let me implement this now:
