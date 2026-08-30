package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	validLines := 0
	validPattern := regexp.MustCompile(`^\s*(\d+(?:,\s*\d+)*)?\s*$`)

	for sc.Scan() {
		line := sc.Text()
		if validPattern.MatchString(line) {
			validLines++
		}
		lines++
	}

	fmt.Printf("valid=%d\n", validLines)
}
