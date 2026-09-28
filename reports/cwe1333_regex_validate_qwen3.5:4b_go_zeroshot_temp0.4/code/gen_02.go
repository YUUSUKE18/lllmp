package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}
	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		// 整数かどうかのチェック
		var _ int64
		_, err := fmt.Sscanf(part, "%d", &_)
		if err != nil {
			return false
		}
	}
	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
