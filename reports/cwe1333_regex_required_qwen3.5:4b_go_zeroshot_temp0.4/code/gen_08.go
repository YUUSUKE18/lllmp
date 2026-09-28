package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil)
	validCount := 0
	re := regexp.MustCompile(`^\s*(\d+(?:,\s*\d+)*)?\s*$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if re.MatchString(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
