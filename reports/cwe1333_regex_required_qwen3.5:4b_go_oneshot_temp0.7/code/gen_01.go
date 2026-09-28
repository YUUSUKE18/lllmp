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
	lineRegexp := regexp.MustCompile(`^[\d,]+$`)

	for sc.Scan() {
		line := sc.Text()
		if lineRegexp.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
