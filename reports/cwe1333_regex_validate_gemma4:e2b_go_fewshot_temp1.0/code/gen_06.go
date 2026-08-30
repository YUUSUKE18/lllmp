package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := scanner.Text()
		// 行の前後の空白を無視するため、TrimSpaceで前処理する
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// カンマで分割して、空でない数字列が存在するか確認する
		// 末尾のカンマも許容するため、Splitで分割した後、要素が一つ以上あればOKとする。
		// ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいること」なので、
		// カンマで区切られた要素が1つ以上存在することを確認する。
		// 末尾のカンマがあっても、それが空文字列にならない限り、妥当と見なす。
		
		// カンマで分割する際に、末尾のカンマを含む場合を考慮して処理する。
		// 例: "1,2,3," -> ["1", "2", "3", ""]
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当であるための条件: 
		// 1. 空行でないこと (すでにチェック済み)
		// 2. 少なくとも1つの非空の要素（数字列と見なせるもの）が存在すること。
		
		hasContent := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				hasContent = true
				break
			}
		}

		if hasContent {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
