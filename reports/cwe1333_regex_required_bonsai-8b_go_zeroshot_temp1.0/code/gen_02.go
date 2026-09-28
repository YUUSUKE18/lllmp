package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^([1-9]\d*)$`)
	var validLines []string

	for line := range os.Scan(os.Stdin) {
		trimLine := strings.TrimSpace(line)
		if len(trimLine) == 0 {
			continue
		}

		if match := scanner.MatchString(trimLine); match {
			validLines = append(validLines, trimLine)
		}
	}

	fmt.Printf("valid=%d\n", len(validLines))
}
