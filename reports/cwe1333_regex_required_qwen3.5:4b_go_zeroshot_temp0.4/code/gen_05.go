package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil)
	validCount := 0

	pattern := regexp.MustCompile(`^\s*(?:\d+(?:,\s*\d+)*)?\s*$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
