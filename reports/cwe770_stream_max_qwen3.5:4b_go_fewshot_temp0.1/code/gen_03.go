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
								// Actually, if no valid integers are found, max should be handled gracefully or default to something indicating none?
								// The spec says "count" and "max". If count is 0, what about max? 
								// Looking at example patterns: usually it's safe to init with min int64 but check if any was set.
								// However, the problem implies there might be numbers. Let's assume valid input exists or handle empty case.
								// If no integers found, count=0, max should probably not print a number or use 0? 
								// But strictly following "max=<最大値>", if no value, maybe it's undefined. 
								// Let's initialize with the smallest possible int64 and update only if we find something larger than current min.
								// Wait, better approach: init maxVal to a very small number (min_int64) but track if any was set?
								// Or simply start with 0 and handle negative numbers correctly by initializing with the first valid found or min int64.
								// Let's use -1<<63 as initial, which is less than any positive integer, but we need to be careful about overflow logic if input has only negatives? 
								// Actually, standard practice: init maxVal = math.MinInt64 (but no import for math). So let's do manual check.
								// Better: set a flag or initialize with the first valid number found.

	maxFound := false // Flag to track if any integer was processed

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements
		}

		count++
		if !maxFound || n > maxVal {
			maxVal = n
			maxFound = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
