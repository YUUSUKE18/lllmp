package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	rx := regexp.MustCompile(`^\s*[\d,]+(\s*,\s*)*$`)
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if rx.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
