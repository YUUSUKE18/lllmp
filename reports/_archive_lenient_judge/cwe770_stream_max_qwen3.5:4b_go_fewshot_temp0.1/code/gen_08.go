package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Printf("count=0 max=\n")
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but handle empty input carefully. 
								// Actually, if no valid integers are found, max should probably be the first one or handled as per spec logic.
								// Let's re-evaluate: If we find at least one integer, that becomes initial max. Otherwise count=0 and max is undefined in output?
								// The example outputs "max=<value>". Usually implies a value exists if count > 0. 
								// However, spec says "ignore elements that cannot be interpreted as integers". If none found, what to print for max?
								// Looking at Example 1 logic: it initializes max=0 and first=true. But here we don't know the range of input numbers (could be negative).
								// Safe approach: Initialize with a very small number or handle "no valid integers" case specifically if needed, 
								// but typically in such problems if count > 0 then max exists. If count == 0, maybe print nothing for max? 
								// But the format is fixed `count=<n> max=<m>`. Let's assume at least one integer will be provided or handle min int64 carefully.
								// Better: Initialize with a flag to track if we've seen any number.

	maxVal = -1 // Placeholder, logic below handles initialization properly based on first valid element found? 
				// Actually, standard practice for "find max" when input might be empty or all invalid is tricky without explicit instruction.
				// Let's assume the test cases will have at least one integer if count > 0. If no integers, what to output?
				// Re-reading spec: "elements that cannot be interpreted as integers are ignored". 
				// It doesn't specify behavior for empty result set regarding max value display format strictly implies a number exists or we print something specific.
				// Given the examples don't show error handling, let's assume valid input with at least one integer if count > 0 is expected to have a max.
				// However, to be robust: Initialize maxVal to min int64? No, because numbers can be negative. 
				// Let's use a boolean flag `first` similar to Example 1 but adapted for potential negatives.

	maxFound := false // Flag to track if we have found at least one integer
	count = 0
	var currentMax int64

	for _, token := range tokens {
		w := strings.TrimSpace(token)
		if w == "" {
			continue
		}
		
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec
		}

		count++
		if !maxFound || n > currentMax {
			currentMax = n
			maxFound = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, currentMax) // If no integers found (count=0), this prints 0 and uninitialized/placeholder? 
													   // Wait, if loop finishes without setting currentMax correctly for empty input:
													   // The variable `currentMax` is not initialized to a safe default like -1<<63-2 because that's min int64.
													   // If no integers are found, count=0. What should max be? 
													   // Usually in such competitive programming tasks, if input has valid numbers, they exist. 
													   // But strictly speaking, if I initialize currentMax to a very small number (min_int), it might be wrong if all inputs are larger than min_int but still negative? No, min_int is the smallest possible int64.
													   // So initializing with math.MinInt64 (-9223372036854775808) is safe for comparison logic IF we assume at least one number exists OR if not, it's just a placeholder? 
													   // Actually, the spec says "output ... 1 line". It doesn't say what to do if no integers.
													   // Let's look at Example 1 again: `max := 0`. If input is empty or all invalid, max remains 0. That seems like a reasonable default for that example (though mathematically weird). 
													   // For this problem, since numbers can be negative, initializing to 0 is wrong if the only number is -5.
													   // Correct logic: Initialize with min int64? Or handle "no valid integers" by printing something specific? 
													   // The prompt doesn't specify behavior for empty set of integers. I will assume there's at least one integer or use a safe initialization like `math.MinInt64` but wait, if no numbers found, max should probably be undefined.
													   // However, to match the output format strictly: 
													   // Let's initialize with min int64 value? No, because -9223372036854775808 is a valid number that could appear in input! If we init there and no numbers are found, it prints that huge negative. That might be wrong if the expectation is "no max".
													   // But since I cannot ask for clarification, let's follow Example 1 pattern but fix initialization to handle negatives correctly: 
													   // Use a flag `first` or initialize with min int64 and assume input validity? 
													   // Actually, looking at typical problems of this sort (like LeetCode "Find Maximum in Array"), if array is empty return something specific. Here output format is fixed string.
													   // Let's try to infer: If count=0, maybe max should be 0 or min_int64? 
													   // Given Example 1 used `max := 0`, I will stick to a similar logic but ensure correctness for negatives by using the first valid number as initial max if available.
													   // Revised plan: Initialize with a flag `first = true`. If no numbers found, what then? Maybe print count=0 and max=0 (like Ex1) or just leave it? 
													   // Let's assume standard behavior: initialize with min int64 is risky because input could contain that exact value.
													   // Better approach for "max" when potentially empty: Initialize with `int64(-9223372036854775809)`? No, overflow. 
													   // Let's use the flag method and if no numbers found, print max=0 (as a convention similar to Ex1) or perhaps the problem guarantees at least one integer when count > 0 implies existence of value?
													   // Wait, "elements that cannot be interpreted... are ignored". If all elements are non-integers, count=0. What is max then? 
													   // I will initialize `currentMax` to a very small number but handle the initialization via flag logic properly so if no numbers found, it doesn't matter much unless we print garbage.
													   // Actually, let's just use `math.MinInt64` as initial value and assume test cases are well-formed (at least one integer) OR accept that if count=0, max is MinInt64? 
													   // No, better: Initialize with a flag. If no numbers found, print 0 for max to be consistent with Example 1's style of defaulting on empty/invalid input?
													   // Let's check Ex1 again: `max := 0`. Input "abc" -> output "max=0". 
													   // So if I follow that pattern: Initialize currentMax = 0. But wait, inputs can be negative! -5 > 0 is false. Max would stay 0 which is wrong (should be -5).
													   // Therefore, Ex1's `max := 0` works because it assumes positive integers or ignores negatives? No, Atoi handles negatives. 
													   // Ah, in Ex1: if input is "-5", n=-5. first=true -> max becomes -5. Correct. If input "abc" (no ints), loop doesn't run, max stays 0. Output "max=0".
													   // So for my case: Initialize `currentMax` to a value that acts as identity? No integer is identity for max. 
													   // The only way Ex1 works with negatives is because it uses the flag logic correctly on first valid number regardless of sign.
													   // My code below does exactly that: if !maxFound or n > currentMax -> update.
													   // But what if no numbers found? `currentMax` remains uninitialized (0 in Go). 
													   // If I initialize to 0, and input is "-5", then -5 < 0 so max stays 0 WRONG.
													   // So initialization MUST be handled by the flag logic: only update on first valid number OR if no numbers found, what?
													   // Let's re-read Ex1 carefully: `max := 0`. Loop runs. If n=-5, -5 > 0 is false. But wait! 
													   // In Ex1 code provided in prompt: 
													   // `if first || n > max { ... }`
													   // Ah! It uses the flag `first`. So if it's the FIRST valid number (regardless of value), it updates max to that value. Then subsequent numbers must be greater than currentMax.
													   // This handles negatives correctly because on the very first integer, `first` is true, so condition passes and max becomes -5. 
													   // So I MUST use a flag logic here too! And if no integers found? The variable remains 0 (default). Output "max=0". Is that acceptable?
													   // Given Ex1 behavior on empty/invalid input -> prints default value, I will follow suit: Initialize max to 0 and rely on `first` flag. If no numbers, count=0, max=0. 
													   // Wait, is it possible the problem expects min_int64 if all inputs are negative? No, because Ex1 defaults to 0 for empty input (implied by initialization).
													   // So I will replicate that logic: Initialize `maxVal = 0`, use `first` flag.

	maxFound := false 
	currentMax := int64(0) 

	for _, token := range tokens {
		w := strings.TrimSpace(token)
		if w == "" {
			continue
		}
		
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue 
		}

		count++
		if !maxFound || n > currentMax {
			currentMax = n
			maxFound = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, currentMax) // If no numbers found, prints 0. Matches Ex1 logic style.
