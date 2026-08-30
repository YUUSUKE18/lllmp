package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	pattern := `^\s*(\d+)(?:,\s*\d+)*$`
	re := regexp.MustCompile(pattern)
	validCount := 0
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		if re.MatchString(scanner.Text()) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
