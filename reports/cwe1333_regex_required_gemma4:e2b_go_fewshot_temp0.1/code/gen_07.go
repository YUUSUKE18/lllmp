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
	// ^\s* - 行の先頭の空白（無視される）
	// (?:[0-9]+(?:,\s*[0-9]+)*) - 1つ以上の数字列と、その後にカンマと空白が続くパターンを繰り返す
	// (?:,\s*|$) - カンマと空白、または行末
	// $ - 行の終わり
	// この正規表現は、カンマ区切りの整数列が1つ以上存在することをチェックします。
	// より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
	// 各要素が数字のみで構成されていることを確認するアプローチを取ります。

	// 妥当性の判定ロジックを再考します。
	// 仕様: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
	// 空行、および数字とカンマ以外を含む行は妥当ではない。

	// 1. 行を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 2. 正規表現で検証
		// 許容されるパターン: 数字とカンマ、および空白のみで構成される。
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
		// パターン: (数字, カンマ, 数字, カンマ, ...) または (数字)
		// 末尾のカンマは許容。
		// 許容されるのは、数字とカンマ、空白のみで構成されている行。

		// 以下の正規表現は、行が数字とカンマ、空白のみで構成されていることを確認します。
		// ^\s* - 行頭の空白
		// (?:[0-9]+(?:,\s*|$))* - 1つ以上の数字列と、それに続くカンマと空白の繰り返し。末尾はカンマまたは行末。
		// \s*$ - 行末の空白
		// この正規表現は、数字とカンマのみで構成されていることを確認するのに適しています。

		// より簡単なアプローチとして、各要素が数字のみで構成されているかを確認します。
		// 1. 行をカンマで分割する。
		parts := strings.Split(trimmedLine, ",")
		
		isValid := false
		if len(parts) > 0 {
			// 少なくとも1つの要素が存在する
			
			// すべての要素が数字または空文字列（末尾のカンマによる）であるかを確認する
			allValid := true
			for _, part := range parts {
				// 各部分が数字のみ、または空文字列（末尾のカンマによる）であるかチェック
				if strings.TrimSpace(part) == "" {
					// 末尾のカンマによる空要素は許容される
					continue
				}
				// 数字のみで構成されているかチェック
				if !regexp.MustCompile(`^\d+$`).MatchString(strings.TrimSpace(part)) {
					allValid = false
					break
				}
			}

			if allValid {
				// 1個以上の数字列がカンマで区切られているか、または単一の数字列であるか
				// 少なくとも1つの要素が数字で構成されている必要がある
				hasNumber := false
				for _, part := range parts {
					if strings.TrimSpace(part) != "" {
						if regexp.MustCompile(`^\d+$`).MatchString(strings.TrimSpace(part)) {
							hasNumber = true
							break
						}
					}
				}
				
				if hasNumber {
					validLines++
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("valid=%d\n", validLines)
}
