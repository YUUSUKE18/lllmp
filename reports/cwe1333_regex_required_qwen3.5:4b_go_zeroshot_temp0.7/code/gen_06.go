package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	validCount := 0
	scanner := bufio.NewScanner(stdio)
	pattern := regexp.MustCompile(`^\s*([0-9]+(\s*,\s*[0-9]+)*|\s*)$`)

	for scanner.Scan() {
		line := scanner.Text()
		if pattern.MatchString(line) && len(line) > 0 || line == "" {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
