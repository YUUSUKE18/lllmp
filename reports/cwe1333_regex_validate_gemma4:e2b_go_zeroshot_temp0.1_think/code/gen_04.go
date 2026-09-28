package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValid(line string) bool {
	trimmedLine := strings.TrimSpace(line)

	if trimmedLine == "" {
		return false // 空行は妥当ではない
	}

	// カンマで分割する
	parts := strings.Split(trimmedLine, ",")

	// 1個以上の数字列がカンマで区切られて並んでいることを確認する。
	// 構造的に、各トークンは数字または空文字列（末尾のカンマによる）で構成されている必要がある。
	for _, part := range parts {
		if part == "" {
			// 末尾のカンマによる空文字列は許容される
			continue
		}

		// 空文字列でない場合、その部分が完全に整数であることを確認する
		if !isNumeric(part) {
			return false
		}
	}

	// 念のため、分割後の要素が一つ以上あることを確認する（これはtrimmedLine != ""で保証されている）
	return true
}

// isNumeric は文字列が完全に数字のみで構成されているかをチェックする
func isNumeric(s string) bool {
	if s == "" {
		return false // 空文字列は数字列ではない
	}
	for _, r := range s {
		if r < '0' || r > '9' {
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
		if isValid(line) {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常、競技プログラミング環境では必須ではないが、堅牢性のために残す）
		// fmt.Fprintln(os.Stderr, "reading standard input:", err)
	}

	// 厳密に valid=<妥当な行数> を出力する
	fmt.Println("valid=", validCount)
}
