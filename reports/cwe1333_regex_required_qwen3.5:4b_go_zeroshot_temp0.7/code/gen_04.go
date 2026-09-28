package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var validCount int
	validRegex := regexp.MustCompile(`^\s*[\d,]+(?:,\s*\d+)*\s*$`)
	
	for scanner.Scan() {
		line := scanner.Text()
		if validRegex.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
