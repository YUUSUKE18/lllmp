package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isValidLine(line string) bool {
	stripped := strings.TrimSpace(line)
	if stripped == "" {
		return false
    }

	parts := strings.Split(stripped, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			return false
        }
		
		num, err := strconv.Atoi(part)
		if err != nil {
			return false
        }
    }
    
    return true
}

func main() {
	var validCount int
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			validCount++
        }
    }

	if err := scanner.Err(); err != nil {
		// エラー発生時は無視する（仕様上は行数のみ出力）
    }

	fmt.Printf("valid=%d\n", validCount)
}
