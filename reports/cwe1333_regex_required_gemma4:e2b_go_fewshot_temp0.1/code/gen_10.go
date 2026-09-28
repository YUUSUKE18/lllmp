package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	// カンマ区切りの整数列の妥当性を判定するための正規表現
	// ^\s* - 行の先頭の空白
	// (?:[0-9]+(?:,\s*[0-9]+)*) - 1つ以上の数字とカンマの組み合わせ（数字が1つ以上続く）
	// (?:,\s*)? - オプションのカンマと空白（末尾のカンマを許容するため）
	// \s*$ - 行末の空白
	// この正規表現は、少なくとも1つの数字列が存在し、カンマで区切られている、または単一の数字列であるケースを捉えることを目指します。
	// より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
	// 各要素が数字のみで構成されていることを確認するアプローチを取ります。

	// 妥当性の判定ロジックを実装
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容しつつ、カンマで区切られた数字列のみを含むかを確認する
		// 正規表現: ^\s* (数字とカンマのパターン)+ \s*$
		// 1. 行全体が数字とカンマのみで構成されているかを確認する
		// 2. 少なくとも1つの数字列が存在するかを確認する

		// 1. 数字とカンマのみで構成されているかチェック
		// 許容されるパターン: 数字、カンマ、空白
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
		// 各要素が数字のみで構成されていることを確認します。

		parts := strings.Split(trimmedLine, ",")
		isValid := false
		
		if len(parts) > 0 {
			// 少なくとも1つの要素がある
			hasDigits := false
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart != "" {
					// 各部分が整数のみで構成されているかチェック
					if regexp.MustCompile(`^\d+$`).MatchString(trimmedPart) {
						hasDigits = true
					} else {
						// 数字以外の文字が含まれている場合、妥当ではない
						break
					}
				}
			}
			
			// 少なくとも1つの有効な数字列が存在し、かつ、行全体が数字とカンマのみで構成されているか
			// 末尾のカンマは許容されるため、最後の要素が空でも良い。
			if hasDigits {
				// 妥当な行としてカウント
				validLines++
			}
		}

	}

	fmt.Printf("valid=%d\n", validLines)
}
