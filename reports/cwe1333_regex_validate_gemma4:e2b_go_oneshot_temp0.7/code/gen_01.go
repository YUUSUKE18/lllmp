package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容するため、カンマで分割する前に処理する
		// カンマで区切られた整数列として妥当であるか判定する
		// 1個以上の数字列がカンマで区切られて並んでいることを確認する。
		// 末尾のカンマは許容される。

		// 末尾のカンマを除去して、カンマで分割する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行（trimSpaceで既に除外済み）
			// 元の行が「カンマ」のみで構成されていた場合も考慮する。
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// これは、少なくとも一つの数字列が存在することを意味する。
			continue
		}

		// カンマで分割して、各部分が数字列であることを確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 少なくとも1つの数字列が存在すれば妥当
		// trimSpaceで処理済みなので、partsが空でないことを確認するだけで十分ではない。
		// 実際には、splitの結果が空文字列を含んでいれば、それは数字列ではない可能性がある。
		
		isValid := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// 数字列が存在すればOK
				isValid = true
				break
			}
		}
		
		// 末尾のカンマが許容されるため、元の行の構造を再評価する必要がある。
		// 例: "1,2," -> parts = ["1", "2", ""]。isValid=true
		// 例: "," -> trimmedLine="" -> continue
		// 例: "abc,1" -> parts = ["abc", "1"]。isValid=true (ただし、'abc'は数字列ではないが、仕様は「数字列」とある)
		
		// 仕様の解釈: 「数字列」とは、数字のみで構成された部分を指す。
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで区切られた各要素が数字列である、というよりは、
		// カンマで区切られた結果、少なくとも1つの数字列が存在すれば良い、と解釈する。
		// ただし、「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
		// 各要素が数字のみで構成されていることを確認する必要がある。

		allAreDigits := true
		for _, part := range parts {
			// partが空文字列（末尾カンマによる）または数字のみであることを確認
			if part == "" {
				// 末尾カンマによる空要素は許容されるが、他の要素が数字列である必要がある。
				continue
			}
			if !isNumeric(part) {
				allAreDigits = false
				break
			}
		}

		if allAreDigits {
			// 少なくとも1つの数字列が存在すれば妥当
			if isValid {
				validCount++
			}
		}
	}

	// 最終的な出力
	fmt.Printf("valid=%d\n", validCount)
}

// isNumeric は文字列が完全に数字のみで構成されているかをチェックするヘルパー関数
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
