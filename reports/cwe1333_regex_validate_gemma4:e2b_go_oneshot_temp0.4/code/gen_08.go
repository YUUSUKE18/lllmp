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
			continue
		}

		// 末尾のカンマを許容して、カンマ区切りの整数列として妥当かを判定する
		// これは、カンマで区切られた要素がすべて整数であることを確認する。
		// 妥当とは「1個以上の数字列がカンマで区切られて並んでいること」と「数字とカンマ以外を含まないこと」を意味する。

		// 1. 行が空でないことを確認済み。
		// 2. 数字とカンマ以外を含まないことを確認する。
		isValidFormat := true
		for _, char := range line {
			if !('0' <= char && char <= '9' || char == ',') {
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			continue
		}

		// 3. カンマ区切りの整数列として妥当かチェックする。
		// 妥当とは「1個以上の数字列がカンマで区切られて並んでいること」
		// 末尾のカンマは許容する。

		// カンマで分割してみる
		parts := strings.Split(line, ",")
		
		// 空の要素が1つ以上あるか、または数字列が1つ以上存在するかをチェックする。
		// 例: "1,2,3" -> ["1", "2", "3"] (len=3) -> OK
		// 例: "1," -> ["1", ""] (len=2) -> OK (末尾のカンマが空文字列を生む)
		// 例: "," -> ["", ""] (len=2) -> NG (数字列がない)
		// 例: "" (空行は既にスキップ済み)

		hasNumber := false
		for _, part := range parts {
			// partが空でなく、かつ数字のみで構成されているかを確認する
			if part != "" {
				if strings.TrimSpace(part) == "" {
					// 空の要素がカンマの連続などで発生した場合、それは妥当ではないと見なすか？
					// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
					// "1,,2" の場合、"1", "", "2" となり、数字列は2つあるため妥当と解釈する。
					// ただし、「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
					// 数字列が一つでも存在すれば妥当とする。
					hasNumber = true
				} else {
					// 数字列が存在した
					hasNumber = true
				}
			}
		}

		// 最終的な妥当性の判定：数字列が1つ以上存在すること。
		if hasNumber {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
