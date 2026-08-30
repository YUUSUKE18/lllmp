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
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				isValid = false
				break
			}
			_, err := fmt.Sscanf(part, "%d", nil)
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
