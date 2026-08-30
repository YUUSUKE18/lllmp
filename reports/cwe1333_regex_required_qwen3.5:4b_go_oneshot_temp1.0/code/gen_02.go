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
	validRe := regexp.MustCompile(`^[[:space:]]*(\d+(?:,\d+)*)[[:space:]]*$`)

	for sc.Scan() {
		line := sc.Text()
		if validRe.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
