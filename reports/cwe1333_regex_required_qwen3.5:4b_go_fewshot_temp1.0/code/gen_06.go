package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`^\s*([0-9]+(\,[0-9]+)*)(\s*)$`)
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		if re.MatchString(scanner.Text()) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
