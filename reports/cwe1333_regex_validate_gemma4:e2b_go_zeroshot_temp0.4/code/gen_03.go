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
		// 行の前後の空白を無視する（ここでは行全体をチェックするため、トリミングは不要だが、
		// 以下のチェックで空白が許容されるか確認する）

		// 1. 空行のチェック
		if strings.TrimSpace(line) == "" {
			continue
		}

		// 2. 数字とカンマ以外を含む行のチェック
		// 行に含まれる文字が数字(0-9)またはカンマ(,)のみで構成されているかを確認する
		isValidChar := true
		for _, char := range line {
			if !('0' <= char && char <= '9') && char != ',' {
				isValidChar = false
				break
			}
		}
		if !isValidChar {
			continue
		}

		// 3. カンマ区切りの整数列の妥当性のチェック
		// 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
		// 末尾のカンマは許容される。

		// カンマで分割する
		parts := strings.Split(line, ",")

		// 妥当な行であるためには、少なくとも1つの要素（数字列）が存在する必要がある。
		// ただし、空の要素（例: ",," や "1,,2" のようなケース）を許容しないように注意する。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」

		// 空の要素をフィルタリングして、実際に数字列が存在するか確認する
		hasNumberColumn := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列として妥当か確認（ここでは、その部分が全て数字であるかを確認する）
				allDigits := true
				for _, char := range trimmedPart {
					if '0' <= char && char <= '9' {
						// 数字である
					} else {
						allDigits = false
						break
					}
				}
				if allDigits {
					hasNumberColumn = true
					// 1個以上の数字列が存在すればOK
					break
				}
			}
		}

		if hasNumberColumn {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、念のため）
	}

	// 結果の出力
	fmt.Printf("valid=%d\n", validCount)
}
