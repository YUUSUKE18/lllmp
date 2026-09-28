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
	validRegex := regexp.MustCompile(`^\s*(\d+)(?:,\s*\d+)*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if validRegex.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
