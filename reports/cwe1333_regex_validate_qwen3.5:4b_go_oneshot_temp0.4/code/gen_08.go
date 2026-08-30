package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		cleanLine := strings.TrimSpace(line)
		parts := strings.Split(cleanLine, ",")
		if len(parts) == 0 {
			continue
		}

		valid := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				valid = false
				break
			}
			if _, err := strconv.Atoi(part); err != nil {
				valid = false
				break
			}
		}

		if valid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
