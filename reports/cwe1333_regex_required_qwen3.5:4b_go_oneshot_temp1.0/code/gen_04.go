package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	pattern := regexp.MustCompile(`^[[:space:]]*((?:\d+(?:,\s*\d+)?)+(?:,\s*$))?[[:space:]]*$`)
	
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for sc.Scan() {
		line := sc.Text()
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
