package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin in Go 1.20+
	validCount := 0

	pattern := regexp.MustCompile(`^\s*(\d+(?:\s*,?\s*\d+)*)?$`)

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
