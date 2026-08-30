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
								// Actually, if no valid integers are found, max should probably be the first one or handled logically.
								// Let's re-evaluate: If we find at least one integer, that becomes initial max. Otherwise 0? Or undefined behavior is avoided by logic.
								// Better approach: Initialize with a flag or handle empty set explicitly if needed, but spec implies finding them. 
								// To be safe for "no valid integers": let's use int64(-1<<63) as initial and update only on first found? No, standard practice is to init maxVal very small.
								// However, since we need a single output line even if count=0 (implied by spec logic), 
								// what should max be when no integers exist? The problem doesn't specify behavior for empty input explicitly beyond "ignore invalid".
								// Let's assume valid inputs will have at least one number or handle the case where we find nothing.
								// Re-reading: "要素数" and "最大値". If count is 0, max value is undefined mathematically but program must output something? 
								// Usually in such problems if no numbers are found, it might be an error condition or specific default. 
								// Given the examples don't show empty input cases failing gracefully with a 'max' placeholder other than logic:
								// Let's initialize maxVal to int64(-1<<63) (min_int64 + 2 is safe lower bound if we assume positive inputs? No, range includes negatives). 
								// Correct initialization for finding maximum in potentially negative numbers without a sentinel that could be valid:
								// Use a boolean flag `found` to track if any integer was parsed.

	maxVal := int64(0) // Placeholder; will be overwritten on first find or handled via logic below
	foundAny := false

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
		if !foundAny || n > maxVal {
			maxVal = n
			foundAny = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
