package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`^\s*[\d,]+(?:\s*,\s*)?$`)
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		if re.MatchString(sc.Text()) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
