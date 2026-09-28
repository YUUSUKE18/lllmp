package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(nil) // dummy scanner check to trigger panic on nil if not used, but here we read lines directly
	// Actually, let's use os.Stdin properly for reading lines
	sc = bufio.NewScanner(os.Stdin)
	
	var count int64
	var sum int64
	
	lineNum := 0
	lineIndex := 1
	
	for sc.Scan() {
		lineNum++
		inputLine := sc.Text()
		
		if lineNum == 1 {
			// First line: expected count
			_, err := strconv.ParseInt(inputLine, 10, 64)
			if err != nil {
				continue // Skip invalid expected count lines if any (though spec says it exists)
			}
			expectedCount := len(strings.Fields(inputLine))
			continue 
		}
		
		// Parse the current line as integer(s), summing up valid numbers found in subsequent lines
		parts := strings.Fields(inputLine)
		for _, s := range parts {
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue 
			}
			count++
			sum += n
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
