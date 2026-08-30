package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isInt(s string) bool {
	if len(s) == 0 {
		return false
	}
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := os.Stdout

	validCount := 0
	lineNum := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		lineNum++

		// 前後の空白を除去
		cleanLine := strings.TrimSpace(line)

		// 空行は妥当ではない
		if cleanLine == "" {
			continue
		}

		// 数字とカンマ以外が含まれているかチェック
		for _, r := range cleanLine {
			if !(r >= '0' && r <= '9' || r == ',') {
				validCount-- // 不正な行をカウント（ただし仕様は「妥当かどうか」なので、今回は出力のみ）
				break
			}
		}

		// カンマ区切りで分割
		parts := strings.Split(cleanLine, ",")

		// 各要素が整数列であるかチェック
		allInts := true
		for _, part := range parts {
			if !isInt(part) {
				allInts = false
				break
			}
		}

		// 1 個以上の数字列があるかチェック
		if len(parts) == 0 || !allInts {
			continue // 妥当ではない
		}

		validCount++
	}

	fmt.Printf("valid=%d\n", validCount)
}
