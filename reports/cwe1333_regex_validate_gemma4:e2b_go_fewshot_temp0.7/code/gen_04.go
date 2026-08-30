package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容するため、行全体をチェックする
		// 行が空でない場合、少なくとも1つの数字とカンマのみで構成されているかを確認する。
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が存在し、それらが数字のみで構成されていることを意味する。

		// 妥当性の判定ロジック:
		// 1. 行が空でないこと (strings.TrimSpace(sc.Text()) != "")
		// 2. カンマで区切られた各部分が数字のみで構成されていること。
		// 3. 末尾のカンマは許容される。

		// 簡略化された解釈:
		// 「1個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで分割した結果、空でない要素が1つ以上存在し、それらが数字のみで構成されていることを意味する。

		parts := strings.Split(line, ",")
		
		// 末尾のカンマがあっても、その後の空文字列を考慮する
		// 例: "1,2," -> ["1", "2", ""]

		hasValidNumberPart := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字のみで構成されているかチェック
				if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
					hasValidNumberPart = true
				} else {
					// 数字以外の文字が含まれていたら不適
					break
				}
			}
		}

		if hasValidNumberPart {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
