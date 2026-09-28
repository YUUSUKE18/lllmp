package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"unicode"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		isValid := true
		
		// 行に含まれる文字が数字、カンマ、空白のみであることを確認する
		for _, char := range trimmedLine {
			if !unicode.IsDigit(char) && char != ',' && !unicode.IsSpace(char) {
				isValid = false
				break
			}
		}

		if !isValid {
			continue
		}

		// 構造的な妥当性の確認: 
		// 1個以上の数字列がカンマで区切られている必要がある。
		// これは、カンマで分割した結果、少なくとも1つの非空のトークンが存在すれば満たされる。
		
		// カンマで分割
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列が存在するか確認する
		// ただし、末尾のカンマが許容されるため、空の要素が複数あっても許容される可能性がある。
		// 例: "1," -> ["1", ""] (長さ2)
		// 例: "," -> ["", ""] (長さ2)
		
		// 妥当な行は、カンマで区切られた要素が少なくとも1つ存在し、
		// その要素の中に数字列が含まれている必要がある。
		
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
		// これは、カンマで分割した結果、少なくとも1つの要素が数字列である必要があることを意味する。
		
		hasNumberSequence := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// トークンが空でなければ、それが数字列（または数字列を含む文字列）である
				hasNumberSequence = true
				break
			}
		}

		if hasNumberSequence {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されるが、念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
