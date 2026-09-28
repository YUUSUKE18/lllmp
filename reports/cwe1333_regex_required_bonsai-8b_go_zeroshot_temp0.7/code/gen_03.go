package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^(\d+)(?:,(\d+))*$`)
	var validLines []string

	for line := range os.Stdin {
		line = strings.TrimSpace(line)
		if !line {
			continue
		}
		if scanner.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
}
