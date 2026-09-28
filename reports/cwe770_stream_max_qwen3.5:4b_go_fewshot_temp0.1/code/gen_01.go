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
								// The spec says "find count and maximum". If there's at least one integer, find its max.
								// Let's assume we need to track a flag for whether any number was seen.

	hasNumber := false
	
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
		hasNumber = true
		
		if !hasNumber || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
