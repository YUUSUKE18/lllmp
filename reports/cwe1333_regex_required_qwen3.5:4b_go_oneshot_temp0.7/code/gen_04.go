package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validCount int
	validPattern := regexp.MustCompile(`^\s*(?:\d+,?\s*)*\s*$`)

	for sc.Scan() {
		line := sc.Text()
		if validPattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
