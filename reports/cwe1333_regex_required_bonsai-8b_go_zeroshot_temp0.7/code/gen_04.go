package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^(\d+)(?:,(\d+))*$`)
	var validLines []string

	for {
		line, err := os.ReadFile("input.txt")
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if err == nil {
			if scanner.MatchString(line) {
				validLines = append(validLines, line)
			}
		}
	}

	fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
}
