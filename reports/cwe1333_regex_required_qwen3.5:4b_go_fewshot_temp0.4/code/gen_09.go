package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	validCount := 0
	pattern := regexp.MustCompile(`^\s*[\d,]+\s*$`)

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		if pattern.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
