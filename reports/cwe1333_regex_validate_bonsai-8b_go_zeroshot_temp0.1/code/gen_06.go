package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line := strings.TrimSpace(readLine)
		if line == "" {
			break
		}

		// ループ内での行の処理
		if countDigits(line) >= 1 {
			validLines = append(validLines, line)
		}
	}

	fmt.Println("valid=" + strings.Join(validLines, ", "))
}

func countDigits(s string) int {
	count := 0
	for _, c := range s {
		if c >= '0' && c <= '9' {
			count++
		}
	}
	return count
}
