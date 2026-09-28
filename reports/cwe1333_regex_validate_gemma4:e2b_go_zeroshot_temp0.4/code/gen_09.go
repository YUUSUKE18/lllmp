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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、trimは必須ではないが念のため）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容するが、数字とカンマ以外を含む行は妥当ではない
		// 妥当な行とは、「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素がすべて整数であることを意味する。

		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定
		// 1. 1個以上の数字列がカンマで区切られているか
		// 2. 各部分が空でない（これは、連続するカンマや前後の空白が原因で発生する可能性を考慮する必要がある）
		// 3. 各部分が整数であるか

		isValid := false
		if len(parts) > 0 {
			// 妥当な行の定義を再確認: "1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。"
			// これは、文字列がカンマで区切られた複数の整数で構成されていることを意味する。

			// 各部分が空でないことを確認し、かつすべてが整数であることを確認する
			allPartsAreValid := true
			for _, part := range parts {
				// 各部分の前後空白を無視して、それが整数であるかチェックする
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart == "" {
					// 連続するカンマや前後の空白が原因で空の要素が発生した場合、
					// これは「数字列がカンマで区切られている」という定義から逸脱する可能性がある。
					// ただし、仕様では「末尾のカンマは許容」されているため、
					// 例: "1,2," は妥当。
					// 例: ",1,2" は妥当ではないと解釈する（数字列が1個以上）
					// 例: "1,,2" は妥当ではないと解釈する（空の要素がある）
					
					// ここでは、空の要素が連続して現れる場合は妥当ではないと判断する。
					// ただし、"1,2," の末尾のカンマは許容される。
					// strings.Split("1,2,", ",") -> ["1", "2", ""]
					// 空の要素がある場合は、それは妥当ではないと判断する。
					allPartsAreValid = false
					break
				}

				// 部分が整数であるかチェック
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err != nil {
					allPartsAreValid = false
					break
				}
			}

			if allPartsAreValid {
				// 少なくとも1つの数字列が存在すれば妥当
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	// 結果の出力
	fmt.Printf("valid=%d\n", validCount)
}
