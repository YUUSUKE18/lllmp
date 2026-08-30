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
	maxVal := int64(-9223372036854775808 - 1) // Smaller than min(int64) to ensure first value updates max

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil || n < -9223372036854775808-1 && n > int64(9223372036854775807) {
			continue // Skip invalid integers or out of range (though ParseInt handles overflow by returning error for typical cases, we check bounds just in case logic requires strict min/max init safety if inputs were weirdly malformed strings that parse to huge numbers incorrectly - though standard strconv is robust).
		}

		count++
		if n > maxVal {
			maxVal = n
		} else {
			// If we encounter a valid number but it's not greater than the initial placeholder, update only if necessary or handle logic correctly. 
			// Actually, better approach: Initialize with first valid value.
			// Let's refactor slightly for clarity in loop without double initialization issues above.
			if maxVal == int64(-9223372036854775808-1) {
				maxVal = n
			} else if n > maxVal {
				maxVal = n
			}
		}
	}

	if count == 0 {
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
