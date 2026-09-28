package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
	var validLines []string

	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Fprintf(os.Stderr, "Invalid input: %s\n", err)
			return
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		if scanner.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	fmt.Printf("valid=%d\n", len(validLines))
}
