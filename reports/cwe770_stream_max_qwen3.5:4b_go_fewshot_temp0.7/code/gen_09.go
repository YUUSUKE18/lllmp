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

	count := 0
	maxVal := int64(-1<<62 - 1) // Initialize to minimum possible value or handle empty case first
	
	for _, w := range strings.Split(sc.Text(), ",") {
		s := strings.TrimSpace(w)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 0, 64)
		if err != nil {
			continue
		}

		count++
		
		// If it's the first valid number or current n is greater than maxVal
		if count == 1 || n > maxVal {
			maxVal = n
		}
	}

	// Handle case where no numbers were found (maxVal remains initial)
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
