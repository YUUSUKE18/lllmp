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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行として扱われる場合（例: "," や " , "）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
			// 空の文字列はこれに該当しないため、妥当ではない。
			continue
		}

		// カンマで分割して、すべてが整数であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られているかを確認する。
		// trimmedLineが空でない限り、少なくとも1つの要素（数字列）は存在する。
		// ただし、"1,2,3" -> ["1", "2", "3"] (長さ3)
		// "," -> "" (これは上記で除外されるか、次のチェックで処理される)
		
		// 各部分が空でないことを確認し、かつ、元の行がカンマ区切りとして意味を持つかを確認する。
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
		// これは、カンマで区切られた要素がすべて数字列である、という条件を暗黙的に満たす必要がある。
		// 仕様：「数字とカンマ以外を含む行は妥当ではありません。」
		// これは、Splitの結果の各要素が数字列であることを確認する必要がある。

		isValid := true
		for _, part := range parts {
			if part == "" {
				// これは末尾のカンマや連続するカンマによって生じる空文字列。
				// 末尾のカンマは許容されるが、空の要素が連続することは許容されない。
				// 例: "1,,2" は妥当ではないと解釈する。
				// ただし、仕様は「末尾のカンマは許容します」とあるため、
				// "1,2," のように末尾のカンマは許容される。
				// strings.Split("1,2," , ",") -> ["1", "2", ""]
				// この空要素が許容されるかどうかが鍵。
				// 「1 個以上の数字列がカンマで区切られて並んでいる」
				// 空の要素は数字列ではないため、妥当ではないと判断する。
				isValid = false
				break
			}
			// 数字列であるか確認
			if _, err := fmt.Sscan(part); err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
