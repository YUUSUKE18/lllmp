package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {	reader := bufio.NewReader(os.Stdin)
	validCount := 0

	var pattern string = "^\\s*((-?\\d+)\\s*,\\s*)*$|^\\s*(-?\\d+)(\\s*,\\s*)?$"
	matchRegex := regexp.MustCompile(pattern)

	for {
		line, _ := reader.ReadString('\n')
		if line == "" {
			break
		}

		pattern := matchRegex.FindString(line)
		if pattern != "" {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
