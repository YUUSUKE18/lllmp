package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^[0-9]+(\,[0-9]+)*[,]?$`)
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if re.MatchString(trimmedLine) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
