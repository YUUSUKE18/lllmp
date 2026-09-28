package main

import (
	"fmt"
	"regexp"
	"os"
)

func main() {
	re := regexp.MustCompile(`^\s*(\d+)(?:,\d+)*\s*$`)
	var validLines []string

	for {
		line, err := os.Readline(os.Stdin)
		if err != nil && err != os.ErrUnexpectedEOF {
			fmt.Fprintf(os.Stdout, "invalid\n")
			return
		}
		if err == os.ErrUnexpectedEOF {
			break
		}
		line = strings.TrimSpace(line)
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	fmt.Fprintf(os.Stdout, "valid=%d\n", len(validLines))
}
