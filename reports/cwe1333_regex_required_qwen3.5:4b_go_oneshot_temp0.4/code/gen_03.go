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
	lineRegex := regexp.MustCompile(`^\s*(\d+(?:,\s*\d+)*)?\s*$`)

	for sc.Scan() {
		if lineRegex.MatchString(sc.Text()) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
