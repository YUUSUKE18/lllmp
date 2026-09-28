package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	rx := regexp.MustCompile(`^\s*(\d+(?:,\s*\d+)*)\s*$`)
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		if rx.MatchString(sc.Text()) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
