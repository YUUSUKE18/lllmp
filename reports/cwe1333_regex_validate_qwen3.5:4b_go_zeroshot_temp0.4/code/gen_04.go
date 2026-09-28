package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		cleanLine := strings.TrimSpace(line)

		if cleanLine == "" {
			continue
		}

		parts := strings.Split(cleanLine, ",")
		isValid := true

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				isValid = false
				break
			}

			_, err := strconv.Atoi(part)
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
