package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isValidLine(line string) int {
	// 行の前後の空白を無視
	line = strings.TrimSpace(line)
	if len(line) == 0 {
		return 0
	}

	// カンマ区切りの整数列を判定
	parts := strings.Split(line, ",")
	if len(parts) < 2 {
		return 0
	}

	for _, part := range parts {
		if part == "" || !strconv.Atoi(part) {
			return 0
		}
	}

	return len(parts) // 場切な行数を返す
}

func main() {
	var validLines []string

	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			break
		}
		if err == os.EOF {
			break
		}

		// 空行や空白行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}

		// 電話番号のような数字とカンマ以外の行は無視
		if !isOnlyDigitsAndCommas(line) {
			continue
		}

		// 場切な行数は取得
		lineNumber := isValidLine(line)
		if lineNumber > 0 {
			validLines = append(validLines, line)
		}
	}

	// 最後に1行 only if there are valid lines
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	}
}

func isOnlyDigitsAndCommas(line string) bool {
	line = strings.TrimSpace(line)
	if len(line) == 0 {
		return false
	}

	for _, ch := range line {
		if ch != ',' && !strconv.Atoi(string(ch)) {
			return false
		}
	}

	return true
}
