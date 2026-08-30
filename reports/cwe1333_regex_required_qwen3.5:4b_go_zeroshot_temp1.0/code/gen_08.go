package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`^\s*\S+,\s*\S+\s*$`)
	scanner := bufio.NewScanner(os.Stdin)
	validLinesCount := 0

	for scanner.Scan() {
		if re.MatchString(scanner.Text()) {
			validLinesCount++
		}
	}

	fmt.Printf("valid=%d\n", validLinesCount)
}
