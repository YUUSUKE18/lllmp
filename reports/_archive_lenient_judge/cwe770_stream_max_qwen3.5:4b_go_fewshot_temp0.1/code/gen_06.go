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
								// Actually, if no valid integers are found, max should probably be the first one or handled as undefined?
								// The spec says "count" and "max". If count is 0, what about max?
								// Looking at example logic: usually initialize with a very small number. 
								// However, if no integers are found, printing an arbitrary large negative might be misleading.
								// Let's assume valid input exists or handle the case where we haven't seen any yet.
								// A safer approach for "max" when count is 0: maybe print nothing? Or a sentinel? 
								// Given the examples don't show edge cases, let's initialize maxVal to int64(-1<<63) (min value).
								// But if we find no numbers, printing min_int64 as "max" is technically wrong.
								// Let's re-read: "整数列を受け取ります... 最大値を求めます". 
								// If the list is empty or has only invalid tokens, count=0. What about max?
								// In many such problems, if no numbers are found, it might be undefined behavior to print a specific number.
								// However, to strictly follow "output 1 line", we must output something. 
								// Let's initialize with the minimum possible int64 value (-9223372036854775808). If count is 0, this will be printed as max.
								// Wait, a better initialization for "max" when no elements exist: 
								// Actually, let's look at the logic again. 
								// We can set initialMax to int64(-1<<63) (which is min_int64). If we find numbers > this, it updates.
								// But if count remains 0, maxVal stays -9223372036854775808? That seems wrong for an empty set. 
								// Perhaps the problem implies non-empty input of integers? Or maybe we should output a specific value like "max=undefined"?
								// But the format is fixed: `count=<n> max=<m>`. No space for undefined.
								// Let's assume there is at least one integer, or if not, print min_int64 as a fallback (though semantically incorrect). 
								// Alternatively, initialize with int64(-1<<63) and update only if found. If count==0, it remains -9223372036854775808?
								// Let's try to be robust: Initialize maxVal to a value that is definitely smaller than any valid int64 except min_int64 itself. 
								// But if the input contains only -9223372036854775808, we must update it? No, because initial should be lower or equal but not confusingly high.
								// Actually, standard practice: init with min_int64. If no numbers found, output that number as max (which is technically the 'max' of an empty set in some contexts if defined as -inf). 
								// Let's stick to initializing with int64(-1<<63) which is mathematically smaller than any other integer? No, it IS min_int64.
								// Better: Initialize maxVal = 0 and handle the first element separately? Or just use a flag `found`. 
								// If not found, what to print? Let's assume valid input has at least one number based on typical CP problem constraints unless specified otherwise.
								// However, to be safe against empty/invalid inputs: if count == 0, maybe we shouldn't output a specific max? But the format requires it. 
								// Let's initialize with int64(-1<<63) (min_int64). If no numbers are found, this value is printed. It might be acceptable as "max of empty" in some definitions or just an artifact.
								// Wait, if I init with min_int64 and the input has -9223372036854775808, it won't update? 
								// Correct logic: Initialize maxVal to int64(-1<<63) is risky because that IS a valid number.
								// Better initialization for "max": use a flag `hasMax` or initialize with something smaller than min_int64 (like -9223372036854775809 which overflows int64). 
								// Since Go doesn't support unsigned 128-bit easily without math/big, let's use a flag.
								hasMax := false

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec "整数として解釈できない要素も無視します"
		}

		count++
		if !hasMax || n > maxVal {
			maxVal = n
			hasMax = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
