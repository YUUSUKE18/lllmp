package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		isValid := true
		hasNumber := false

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				isValid = false
				break
			}

			if _, err := fmt.Sscanf(part, "%d", nil); err != nil {
				isValid = false
				break
			}
			hasNumber = true
		}

		if hasNumber && isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
