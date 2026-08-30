package main

import (
	"bufio"
	"fmt"
	"regexp"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var validCount int
	validRegex := regexp.MustCompile(`^\s*[\d,\s]*\s*$`)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		if validRegex.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
