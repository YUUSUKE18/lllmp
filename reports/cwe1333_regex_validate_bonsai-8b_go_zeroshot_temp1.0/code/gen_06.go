package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var validLines []string
	lines := []string{}

	for {
		n, err := fmt.ScanLine(os.Stdin)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Fprintf(os.Stdout, "invalid\n")
			break
		}

		// 剪除空白
		line := strings.TrimSpace(n)

		// 空行は無視
		if line == "" {
			continue
		}

		// 数値とカンマ以外は無視
		if !isOnlyNumbersAndCommas(line) {
			fmt.Fprintf(os.Stdout, "invalid\n")
			continue
		}

		// カンマ区切りの整数列として検証
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			fmt.Fprintf(os.Stdout, "invalid\n")
			continue
		}

		// マッチする行は保存
		validLines = append(validLines, line)
	}

	// 健全な行数を出力
	fmt.Printf("valid=%d\n", len(validLines))
} 

// isOnlyNumbersAndCommas checks if a line is composed only of numbers and commas
func isOnlyNumbersAndCommas(line string) bool {
	for _, c := range line {
		if !isdigitOrComma(c) {
			return false
		}
	}
	return true

// digitOrComma checks if a rune is a digit or comma
func digitOrComma(r rune) bool {
	if c := strconv.IsDigit(r); c {
		return true
	}
	if r == ',' {
		return true
	}
	return false
}
