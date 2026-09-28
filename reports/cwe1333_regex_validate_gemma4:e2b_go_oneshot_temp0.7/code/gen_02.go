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

		// 末尾のカンマが許容されることを考慮し、カンマで分割する
		// 末尾のカンマがあっても、数字列が1つ以上存在すれば妥当とする。
		// 例: "1,2," -> ["1", "2", ""]
		parts := strings.Split(line, ",")
		
		// 少なくとも1つの要素（数字列または空文字列）が存在すれば、
		// カンマ区切りの形式として許容する。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで区切られた要素が数字列である必要があることを意味する。

		hasDigits := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列として妥当かどうかをチェック
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err == nil {
					hasDigits = true
				} else {
					// 数字以外の文字が含まれていれば不妥当
					hasDigits = false
					break
				}
			}
		}
		
		// 妥当性の判定基準を再確認:
		// 1. 1 個以上の数字列がカンマで区切られて並んでいること。
		// 2. 空行は妥当ではない。
		// 3. 数字とカンマ以外を含む行は妥当ではない。
		
		// ここでは、カンマで区切られた各部分が整数であるか、またはカンマで区切られた結果が
		// 1個以上の数字列を含んでいるかを判定する。
		
		// より厳密に、「1 個以上の数字列がカンマで区切られて並んでいる」を評価する。
		// 例: "1,2" -> ["1", "2"] (2つの数字列) -> 妥当
		// 例: "1," -> ["1", ""] (1つの数字列と空文字列) -> 妥当（末尾のカンマは許容）
		// 例: "," -> ["", ""] (数字列0個) -> 不妥当
		// 例: "a,1" -> ["a", "1"] (数字以外の文字あり) -> 不妥当
		
		isTolerable := false
		numDigits := 0
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列として検証
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err == nil {
					numDigits++
				} else {
					// 数字以外の文字が含まれている場合は不妥当
					goto nextLine
				}
			}
		}

		// 1個以上の数字列が確認できた場合、かつ行が空でなかった場合
		if numDigits >= 1 {
			validCount++
		}

	nextLine:
	}

	fmt.Printf("valid=%d\n", validCount)
}
