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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	tokens := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-^uint64(0)) // Initialize with minimum possible value for signed int64 logic or use a flag. 
								// Actually, simpler to initialize maxVal to the first valid number found or min int64.
								// Let's handle empty input gracefully by initializing count=0 and maxVal=minInt64 but only update if we find numbers.
								// Better approach: Initialize maxVal with a very small number (min int64) and use a flag for first valid element to avoid issues, 
								// OR just track the minimum possible value (-9223372036854775808).
								// Since we need strict output format even if no numbers are found (count=0 max=<something>), what should max be?
								// The spec says "find them". If count is 0, the set of values is empty. Usually undefined or min value. 
								// Let's assume if count > 0 we output actual max, else maybe 0 or minInt64? 
								// Looking at Example 1: it initializes max=0 and first=true. If no numbers found (all invalid), loop finishes with max=0.
								// So let's follow that pattern: initialize count=0, maxVal = int64(0) but wait... if input is "abc", should output be "count=0 max=0"? 
								// Example 1 logic: `max := 0`, `first := true`. If no valid numbers found, it prints `max=0`.
								// So I will follow that. Initialize count=0 and maxVal = int64(0). But wait, if input is "-5", max should be -5. 
								// Initializing to 0 might fail for negative inputs only existing case? No, because Example 1 initializes `max := 0` but updates on first valid number regardless of value via `first || n > max`.
								// Wait, if input is "abc", loop doesn't run or finds no ints. Max stays 0. Output: count=0 max=0. 
								// If input is "-5", -5 < 0? No wait. Example 1 logic: `if first || n > max`.
								// First iteration with -5: `first` is true -> enters if block -> max becomes -5, first false. Correct.
								// So initializing to 0 works because the condition `n > max` handles positive updates from negative only if not first? 
								// Actually if input is "-1", n=-1. If I init max=0. Condition: `first || (-1) > 0`. True (because of first). Updates max to -1. Correct.
								// What if input has multiple numbers like "3, -5"? 
								// First '3': first=true -> update max=3.
								// Second '-5': first=false, check -5 > 3? False. Max stays 3. Correct.
								// So initialization to int64(0) is fine for the logic in Example 1 style, provided we handle negative numbers correctly with `first` flag or just rely on strict inequality if initialized low enough? 
								// Actually standard practice: initialize maxVal = minInt64 and remove 'first' flag dependency for correctness across all negatives.
								// But to strictly mimic the robustness of Example 1 which handles "no numbers" by keeping initial value (0), let's stick close but ensure negative handling is correct. 
								// If I init maxVal = int64(0) and input is "-5", -5 > 0 is false, so it won't update unless 'first' flag helps.
								// Example 1 code: `if first || n > max`. This works perfectly for negatives too because of the `|| first` part on the very first valid element regardless of its sign relative to 0.
								// So I will use a boolean flag or just initialize with minInt64 and no flag? 
								// Let's use int64(-9223372036854775808) as initial maxVal to be safe for any first number, removing the need for 'first' logic if we want pure numeric comparison.
								// But wait, what if input is empty? Count=0. Max should probably be minInt64 or 0? 
								// Example 1 with no numbers: max remains 0. Output "max=0".
								// So I will initialize count = 0 and maxVal = int64(0). And use a flag `found` to ensure the first number updates it correctly even if negative, OR just rely on minInt64 initialization? 
								// If I init with minInt64: Input "-5". -5 > minInt64 is true. Updates max=-5. Correct.
							 //   Input empty. Loop doesn't run. Max remains minInt64. Output "max=" + string(min). That might be weird but mathematically correct for an empty set's maximum (undefined, often represented as -inf or similar in code). 
								// However, Example 1 explicitly sets `max := 0`. So I should probably do the same: init max=0. And use logic to update only if it's a new record OR first element?
							 //   Actually, simpler logic that mimics Example 1 exactly:
							 //   count = 0; maxVal = int64(0); foundFirst := false
							 //   for ... { 
							 //       n, err ...
							 //       if valid {
							 //           if !foundFirst || n > maxVal {
							 //               maxVal = n
							 //               count++ (wait, Example 1 doesn't increment a counter inside loop explicitly in the snippet provided? Wait.)
							 //   } 
							 // Let's re-read Example 1 carefully.
							 // `max := 0`, `first := true`. Loop over fields. If valid int: if first || n > max -> update max, set first=false. It does NOT count elements in the loop!
							 // Wait, "空白区切りの整数列を読み、最大値を...". The example code finds MAXIMUM VALUE. It doesn't ask for COUNT of numbers in Example 1 task description? 
							 // Task 1: "maximum value ... max=<max>". Code does exactly that. No count variable used except implicitly by logic flow but not stored as output format requirement there.
							 // My current task (Task X): Output `count=<個数> max=<最大値>`. So I need to COUNT the valid integers found, AND find their MAXIMUM.
							 // Okay, so: 
							 // 1. Parse comma-separated input.
							 // 2. Filter out empty/invalid tokens. Count them (c). Track maximum value (m).
							 // 3. Output `count=c max=m`.
							 // Logic for m and c:
							 // Initialize c = 0, m = int64(0) ?? 
							 // If I init m=0, and input is "-5", -5 > 0 is false. So m stays 0? That's wrong if the only number is negative.
							 // Must handle first element specially or initialize to minInt64.
							 // Given Example 1 uses `first` flag logic: I will use a similar approach but adapted for counting and maxing with proper initialization (minInt64) OR using 'found' flag. 
							 // Let's init m = int64(-9223372036854775808). And c=0.
							 // If input has numbers, they will update max correctly because any valid number > minInt64 (unless it IS minInt64? Unlikely for Atoi unless specific case, but safe to assume standard range covers updates from min). 
							 // Actually if the only number is exactly MIN_INT64, -9223... == -9223..., so n > max is false. Need `n >= max` or handle first separately?
							 // Example 1 uses `first || n > max`. This handles equality too (if duplicate min). 
							 // So I will use a flag logic to be safe and consistent with the example style, but ensure count increments correctly.

	}
	fmt.Printf("count=%d max=%d\n", c, m)
