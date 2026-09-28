package main

import (
	"bufio"
	"os"
	"regexp"
	"strings"
)

func main() {
	// 正規表現パターン: 1個以上の数字列がカンマで区切られていることを確認する。
	// ^[\d]+       : 行の開始から1つ以上の数字で始まる
	// (?:,[\d]+)*  : カンマと1つ以上の数字が0回以上繰り返される
	// $           : 行の終了
	// これにより、空行、カンマのみの行、数字以外の文字を含む行は除外される。
	pattern := regexp.MustCompile(`^[\d]+(?:,[\d]+)*$`)

	validCount := 0

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		// 行の前後の空白を無視する
		trimmedLine := strings.TrimSpace(line)

		// 空行は妥当ではない
		if trimmedLine == "" {
			continue
		}

		// 正規表現で妥当性を判定
		if pattern.MatchString(trimmedLine) {
			validCount++
		}
	}

	// 結果を出力
	println("valid=", validCount)
}
