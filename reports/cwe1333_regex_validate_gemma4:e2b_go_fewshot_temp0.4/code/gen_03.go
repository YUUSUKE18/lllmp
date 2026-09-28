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

		// 末尾のカンマを除去して、カンマで区切られた整数列として評価する
		// 末尾のカンマがあっても妥当とするため、行全体をチェックする
		
		// カンマで分割
		parts := strings.Split(line, ",")
		
		// 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
		// 空行は既に除外されているため、partsが空でないことを確認すれば良い。
		// 末尾のカンマがあっても、例えば "1,2," の場合、parts は ["1", "2", ""] となる。
		// 妥当なのは、少なくとも1つの有効な数字列が存在する場合。
		
		hasValidNumber := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列であるかチェック
				if _, err := fmt.Sscan(trimmedPart); err == nil {
					hasValidNumber = true
				} else {
					// 数字列以外が含まれている場合は妥当ではない
					hasValidNumber = false
					break
				}
			}
		}

		// 妥当な行の条件: 1個以上の数字列がカンマで区切られていること。
		// 末尾のカンマは許容される。
		// 例: "1,2" -> parts=["1", "2"], hasValidNumber=true (OK)
		// 例: "1," -> parts=["1", ""], hasValidNumber=true (OK)
		// 例: "," -> parts=["", ""], hasValidNumber=false (NG)
		// 例: "abc" -> parts=["abc"], hasValidNumber=false (NG)

		if hasValidNumber {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
