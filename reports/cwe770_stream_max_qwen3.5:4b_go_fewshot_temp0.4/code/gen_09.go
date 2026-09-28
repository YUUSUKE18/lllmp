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

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-^uint64(0)) // Initialize to minimum possible value for signed int64 logic or use a flag. 
								// However, since input can be empty after filtering, let's handle the first valid element separately.

	hasFirstElement := false

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue // Ignore non-integer elements as per spec (though ParseInt handles most cases well with strict parsing if needed, the prompt says "ignore")
		}

		count++
		
		if !hasFirstElement || n > maxVal {
			maxVal = n
			hasFirstElement = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
