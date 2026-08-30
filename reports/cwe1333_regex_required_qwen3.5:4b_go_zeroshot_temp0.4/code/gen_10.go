package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	pattern := regexp.MustCompile(`^\s*(\d+(?:,\d+)*)?\s*$`)

	for scanner.Scan() {
		line := scanner.Text()
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
