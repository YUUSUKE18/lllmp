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
			// 空行は妥当ではない（「1 個以上の数字列がカンマで区切られて並んでいる」を満たさない）
			continue
		}

		// 末尾のカンマを削除して、数字列のみをチェックする
		// 末尾のカンマは許容されるが、その前が数字列である必要がある
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 行がカンマのみ、またはカンマのみで終わる場合（例: "," または "1," の場合）
			// ただし、行全体が数字列でなければならないため、空文字列は妥当ではない
			// ここでは、カンマ区切りで1個以上の数字列が存在することを要求している。
			// 空行以外で、数字列が0個になるケース（例: ","）は妥当ではないとする。
			continue
		}

		// カンマで分割して、すべてが数字列であることを確認する
		parts := strings.Split(line, ",")
		isValid := true
		for _, part := range parts {
			if strings.TrimSpace(part) == "" {
				// 連続するカンマや、末尾のカンマが原因で空の要素が発生する場合
				// ただし、問題文の仕様では「1 個以上の数字列がカンマで区切られて並んでいる」ことを要求。
				// 末尾のカンマは許容される。
				// 例: "1,2," -> ["1", "2", ""]
				// この空の要素は、数字列ではないため、妥当ではないと判断するのが自然。
				// ただし、「末尾のカンマは許容します」という記述を厳密に解釈すると、
				// "1,2," は妥当だが、もし "1,,2" のように連続カンマが含まれる場合も問題になる。

				// 簡略化のため、ここでは各要素が数字列（または空文字列でなければならない）ことを確認する。
				// 空文字列は数字列ではないため、もし空文字列が出現したら妥当ではないと考える。
				isValid = false
				break
			}
			if _, err := fmt.Sscan(part); err != nil {
				// 数字以外の文字が含まれていた場合
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
