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
		line := scanner.Text()
		// 行の前後の空白を無視
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定ロジック
		// 1. 数字とカンマ以外を含む行は妥当ではない
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		
		// 行が空でなければ、カンマ区切りで分割を試みる
		if len(trimmedLine) > 0 {
			// 末尾のカンマが許容されるため、トリムしてから分割する
			// ただし、行全体が数字とカンマのみで構成されている必要がある
			
			// 行が数字とカンマのみで構成されているかを確認する
			isAlphanumericAndComma := true
			for _, char := range trimmedLine {
				if !('0' <= char && char <= '9' || char == ',') {
					isAlphanumericAndComma = false
					break
				}
			}
			
			if !isAlphanumericAndComma {
				continue // 数字とカンマ以外を含む行は妥当ではない
			}

			// 妥当な行であるかどうかの判定
			// 1個以上の数字列がカンマで区切られて並んでいること。
			// これは、カンマで分割した結果、空でない要素が1つ以上存在すれば満たされる。
			
			// 末尾のカンマは許容されるため、一旦行全体を処理する
			// 行をカンマで分割する。末尾のカンマがあっても、最後の要素が空になる可能性がある。
			parts := strings.Split(trimmedLine, ",")
			
			// 末尾のカンマがある場合、最後の要素は空文字列になる
			// 例: "1,2," -> ["1", "2", ""]
			
			// 妥当なのは、カンマで区切られた要素が1個以上存在すること。
			// ただし、「1個以上の数字列がカンマで区切られて並んでいる」という条件を厳密に解釈する。
			// これは、カンマで区切った後に、数字列が存在することを意味する。
			
			// 例: "1,2" -> ["1", "2"] (2個) -> 妥当
			// 例: "1," -> ["1", ""] (2個) -> 妥当 (最後の空文字列は末尾のカンマによる)
			// 例: "," -> ["", ""] (2個) -> 妥当 (これは数字列ではないが、分割結果として存在する)
			
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。」
			// これは、少なくとも1つの要素が数字列である必要があることを示唆する。
			
			hasNumberSequence := false
			for _, part := range parts {
				// 空文字列でない、かつ数字のみから構成されているかを確認する（数字列であること）
				if part != "" {
					isNumeric := true
					for _, char := range part {
						if !('0' <= char && char <= '9') {
							isNumeric = false
							break
						}
					}
					if isNumeric {
						hasNumberSequence = true
						break
					}
				}
			}
			
			if hasNumberSequence {
				validCount++
			}
		}
	}

	// 結果の出力
	fmt.Printf("valid=%d\n", validCount)
}
