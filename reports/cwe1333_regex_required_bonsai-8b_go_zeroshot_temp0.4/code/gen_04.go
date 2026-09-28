package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
	var validLines []string

	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			if err == os.EOF {
				break
			}
			fmt.Fprintf(os.Stderr, "Invalid line: %s\n", err)
			break
		}
		if err == os.ErrUnexpectedEOF {
			break
		}
		line = line.Trim()
		if line == "" {
			continue
		}
		if r.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	fmt.Printf("valid=%d\n", len(validLines))
}
