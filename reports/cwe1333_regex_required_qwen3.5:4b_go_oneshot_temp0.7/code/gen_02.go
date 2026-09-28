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
	re := regexp.MustCompile(`^\s*(?:\d+(?:,\d+)*(?:,?)|)(?:\s*)$`)

	for sc.Scan() {
		line := sc.Text()
		if re.MatchString(line) && line != "" {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
