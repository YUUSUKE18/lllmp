package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	validCount := 0
	validRegex := regexp.MustCompile(`^\s*[\d\s,]*\s*$`)

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
