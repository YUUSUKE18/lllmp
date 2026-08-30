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

		// 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
		// 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで区切られた要素がすべて整数である、という条件を満たすことを意味する。
		// 課題の記述を厳密に解釈すると、「カンマで区切られた要素がすべて整数である」ことを確認する必要がある。
		// 「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
		// 「空行、および数字とカンマ以外を含む行は妥当ではありません。」

		// 1. 数字とカンマ以外を含むかチェック
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

		// 2. 1個以上の数字列がカンマで区切られているかチェック
		// 末尾のカンマは許容される。
		// 例: "1,2,3," は妥当。
		// 例: "1," は妥当。
		// 例: "," は妥当ではない（数字列が0個）。
		// 例: "abc" は上記で除外される。

		// カンマで分割し、空でない要素が1つ以上あるか確認する。
		parts := strings.Split(line, ",")
		
		// 末尾のカンマがある場合、最後の要素は空文字列になる。
		// 例: "1,2," -> ["1", "2", ""]
		// 例: "1,2" -> ["1", "2"]

		// 妥当なのは、少なくとも1つの数字列が存在する場合。
		// 最後の要素が空文字列であっても、それ以前に数字列が存在すればOK。
		hasNumbers := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				hasNumbers = true
				break
			}
		}

		if hasNumbers {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
