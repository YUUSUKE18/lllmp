package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	pattern := regexp.MustCompile(`^\s*(\d+(?:,\s*\d+)*)?\s*$`)

	for sc.Scan() {
		line := sc.Text()
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
