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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行として扱われる場合（例: "," や " , "）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
			// 空の文字列はこれに該当しないため、妥当ではない。
			continue
		}

		// カンマで分割して、各要素が整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られているかを確認する。
		// trimmedLineが空でない限り、少なくとも1つの要素（数字列）が存在する。
		// ただし、"1,2,3" -> ["1", "2", "3"] (長さ3)
		// "," -> "" (これは上記で除外されるべきだが、ここでは厳密にチェック)
		
		// 妥当性の判定: 
		// 1. 行が空でないこと (既にチェック済み)
		// 2. 数字とカンマ以外を含まないこと (trimmedLineが数字とカンマのみで構成されているか)
		// 3. 1個以上の数字列がカンマで区切られていること
		
		// 厳密に「数字列」のみで構成されているかを確認する
		isValidFormat := true
		for _, part := range parts {
			if part == "" {
				// 連続するカンマや末尾のカンマによって生じる空文字列は許容されるが、
				// 妥当なのは「1個以上の数字列がカンマで区切られている」こと。
				// 例: "1,,2" は妥当な区切り方ではないと解釈する。
				// ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、
				// 連続するカンマは無視し、数字列のみが残ることを確認する。
				continue
			}
			// partが整数であるかチェック
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err != nil {
				isValidFormat = false
				break
			}
		}

		if isValidFormat {
			// 少なくとも1つの数字列が存在すれば妥当
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
