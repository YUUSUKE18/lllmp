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

		// 末尾のカンマを除去した後の文字列をチェック
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、またはカンマで終わる行（例: "," または "1,"）は妥当とみなす
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// 末尾のカンマは許容される。
			// 空行は妥当ではない、という条件と対比させる。
			// 空行以外で、カンマのみの行は「数字列が0個」なので妥当ではないと解釈する。
			// ただし、例示された制約から、数字列が1つ以上存在することが重要。
			// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする。
			// 1個以上の数字列が存在するためには、カンマで区切られた後に数字が残っている必要がある。
			// ただし、末尾のカンマは許容される。
			// 例: "1,2," -> 2つの数字列が存在する。
			// 例: "," -> 0個の数字列。
			// 例: "1," -> 1個の数字列。
			// 空行は妥当ではない。
			continue
		}

		// カンマで分割して、空でない要素があるかを確認する
		parts := strings.Split(line, ",")
		
		// 末尾のカンマが許容されるため、最後の要素が空文字列になる可能性がある。
		// 例: "1,2," -> ["1", "2", ""]
		// この場合、"1"と"2"という2つの数字列が存在するため、妥当とする。
		// 空でない要素が1つ以上存在すればOK。
		
		count := 0
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				count++
			}
		}

		if count >= 1 {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
