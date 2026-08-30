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
	linePattern := regexp.MustCompile(`^\s*[0-9,\s]+\s*$`)

	for sc.Scan() {
		if linePattern.MatchString(sc.Text()) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
