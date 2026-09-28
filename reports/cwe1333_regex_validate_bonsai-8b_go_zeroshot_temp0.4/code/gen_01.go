package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line := fmt.Scanln()
		if line == "" {
			break
		}

		// 空行を無視
		if strings.TrimSpace(line) == "" {
			continue
		}

		// ラベルと数字のみを含む行を検証
		if !matchesPattern(line) {
			continue
		}

		// 妜当は1個以上の数字列がある
		if countDigits(line) >= 1 {
			validLines = append(validLines, line)
		}
	}

	// 最終出力
	fmt.Println("valid=" + strings.Join(validLines, ","))
}

// matchesPattern checks if the line is a valid comma-separated integer list
func matchesPattern(line string) bool {
	// ラベルと数字のみを含む行を検証
	if !matchesOnlyLabelsAndDigits(line) {
		return false
	}

	// ラベルと数字のみを含む行が空格で区切られているかを確認
	if strings.TrimSpace(line) != line {
		return false
	}

	return true
}

// matchesOnlyLabelsAndDigits checks if the line contains only labels and digits
func matchesOnlyLabelsAndDigits(line string) bool {
	// ラベルと数字のみを含む行が空格で区切られているかを確認
	if strings.TrimSpace(line) != line {
		return false
	}

	// ラベルと数字のみを含む行を検証
	return containsOnlyDigitsOrLabels(line)
}

// containsOnlyDigitsOrLabels checks if the line contains only digits or labels
func containsOnlyDigitsOrLabels(line string) bool {
	for _, ch := range line {
		if ch != ',' && ch != ' ' && !isdigit(ch) && !islabel(ch) {
			return false
		}
	}
	return true
}

// isdigit checks if a character is a digit
func isdigit(c byte) bool {
	return c >= '0' && c <= '9'
}

// islabel checks if a character is a label (letters)
func islabel(c byte) bool {
	return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z'
}

// countDigits counts the number of digits in the line
func countDigits(line string) int {
	count := 0
	for _, ch := range line {
		if isdigit(ch) {
			count++
		}
	}
	return count
}
