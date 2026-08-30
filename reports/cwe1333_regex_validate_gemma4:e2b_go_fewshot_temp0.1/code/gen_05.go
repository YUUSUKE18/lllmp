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
		// 妥当な形式: 1個以上の数字列がカンマで区切られている。末尾のカンマは許容。
		// これは、行がカンマで区切られた数字のみで構成されていることを意味する。
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする。

		// 行をカンマで分割し、各要素が数字のみであることを確認する
		parts := strings.Split(line, ",")
		
		// 妥当な行であるためには、少なくとも1つの要素が存在し、
		// その要素がすべて数字（カンマ区切りで）で構成されている必要がある。
		// 末尾のカンマは許容されるため、最後の要素が空文字列になる可能性がある。
		
		isValid := true
		for _, part := range parts {
			// 各部分が空文字列でないことを確認する（末尾のカンマによる空要素は許容される）
			if part != "" {
				// 数字のみであることを確認
				if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
					isValid = false
					break
				}
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
