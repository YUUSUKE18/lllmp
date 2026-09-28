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
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		cleaned := strings.Trim(line, " \t")
		parts := strings.Split(cleaned, ",")
		isValid := true

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 {
				continue
			}
			for _, ch := range part {
				if ch < '0' || ch > '9' {
					isValid = false
					break
				}
			}
			if !isValid {
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
