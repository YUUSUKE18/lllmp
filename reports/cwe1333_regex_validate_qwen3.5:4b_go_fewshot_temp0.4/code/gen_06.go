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

		parts := strings.Split(line, ",")
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
