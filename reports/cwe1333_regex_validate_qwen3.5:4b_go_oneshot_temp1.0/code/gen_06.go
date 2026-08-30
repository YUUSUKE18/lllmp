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
			if part == "" || !isNumber(part) {
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

func isNumber(s string) bool {
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}
