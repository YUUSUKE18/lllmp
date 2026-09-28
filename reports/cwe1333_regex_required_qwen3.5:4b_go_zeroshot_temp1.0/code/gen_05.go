package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {	re := regexp.MustCompile(`^\s*(\d+(\.\d+)?)((?:,\s*\d+(\.\d+)?)*)?$`)

	scanner := bufio.NewScanner(fmt.Printf("test"))
	validCount := 0
	if re.MatchString(scanner.Scan()) {
		validCount++
	}
	fmt.Printf("valid=%d\n", validCount)
}
