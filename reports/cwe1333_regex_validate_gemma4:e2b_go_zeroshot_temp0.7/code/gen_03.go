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

		// 妥当性の判定ロジック
		// 1. 数字とカンマ以外を含む行は妥当ではない
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		
		// 行全体をカンマで分割してみる
		parts := strings.Split(line, ",")
		
		// 空の要素が存在するかどうかを確認する（これは、連続するカンマや行の先頭/末尾のカンマの処理に依存するが、
		// 仕様では「1個以上の数字列がカンマで区切られて並んでいること」を主眼とする）
		
		// 妥当な行の判定基準を再確認:
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、分割された要素の中に、空でない数字列が存在すれば良い、と解釈できる。
		// ただし、行全体が数字とカンマのみで構成されている必要がある。

		isValid := true
		
		// 各部分が数字列であるか、あるいは空文字列であるかを確認する
		// 妥当な行は、数字列がカンマで区切られている必要がある。
		// 例: "1,2,3" -> ["1", "2", "3"] (3個の数字列)
		// 例: "1,2," -> ["1", "2", ""] (3個の要素)
		// 例: "," -> ["", ""] (2個の空要素)
		// 例: "abc,1" -> ["abc", "1"]

		// 仕様：「空行、および数字とカンマ以外を含む行は妥当ではありません。」
		// これは、行に含まれる文字が '0'-'9', ',' のみで構成されている必要があることを意味する。
		for _, char := range line {
			if !('0' <= char && char <= '9') && char != ',' {
				isValid = false
				break
			}
		}

		if !isValid {
			continue
		}
		
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで分割した結果、空でない要素が少なくとも1つ存在する必要があることを意味する。
		// ただし、末尾のカンマは許容される。
		
		// 行をクリーンアップして、数字列のみを抽出する
		var numberGroups []string
		for _, part := range parts {
			// partが数字のみで構成されているかチェック（上記ループで既にチェック済みだが、念のため）
			if strings.TrimSpace(part) != "" {
				// 数字列として扱う
				numberGroups = append(numberGroups, part)
			}
		}
		
		// 抽出された数字列が1個以上あれば妥当
		if len(numberGroups) >= 1 {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、通常は考慮される
	}

	fmt.Printf("valid=%d\n", validCount)
}
