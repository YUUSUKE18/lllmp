package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	validLines := 0
	regex := regexp.MustCompile(`^\s*([0-9]+)(?:,\s*[0-9]+)*\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if !validLines && line == "\n" || line == "" {
			continue
		}

		if regex.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
