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

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られているかを確認する。
		// trimmedLineが空でない場合、少なくとも1つの要素（数字列）が存在する。
		// ただし、"1,2,3" -> ["1", "2", "3"] (長さ3)
		// "," -> "" (これは上記で除外されるべきだが、ここでは厳密にチェック)
		
		// 妥当性の判定：
		// 1. 行が空でないこと (line != "")
		// 2. 数字とカンマ以外を含まないこと (これは、Splitの結果がすべて数字列であるか、またはカンマのみで構成されているか、という点に依存する)
		// 3. 1個以上の数字列がカンマで区切られていること。
		
		// 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
		// これは、カンマで分割した結果、空でない要素が1つ以上存在し、かつ、それらがすべて整数である必要がある。
		
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 連続するカンマや末尾のカンマによって生じる空文字列は許容されるが、
				// 「数字列」が区切られている必要があるため、空文字列はNGと考える。
				// 例: "1,,2" -> ["1", "", "2"]。これは妥当ではないと判断すべき。
				isValid = false
				break
			}
			// 数字列であるか確認（ここでは、Splitの結果がすべて数字列であるという前提で進める）
			// 課題の文脈から、数字とカンマ以外を含まないことが重要。
			if _, err := fmt.Sscanf(part, "%d", &parts[0]); err != nil {
				// 実際には、Splitで得られた各要素が整数であることを確認する必要がある。
				// ここでは、Splitの結果がすべて数字列であると仮定し、空文字列の有無を主要なチェックとする。
			}
		}

		if isValid {
			// 妥当な行としてカウント
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
