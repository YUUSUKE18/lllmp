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

		// 末尾のカンマを考慮して、カンマで分割し、空でない要素が存在するか確認する
		// 末尾のカンマがあっても、カンマで区切られた要素が1つ以上あれば妥当とみなす
		parts := strings.Split(line, ",")
		
		// 末尾のカンマがある場合、最後の要素は空文字列になる（例: "1,2," -> ["1", "2", ""]）
		// 妥当であるためには、少なくとも1つの数字列が存在する必要がある。
		// 空行でなければ、少なくとも1つの要素が存在する（たとえそれが空文字列であっても、他の要素があればOKだが、
		// 仕様では「1個以上の数字列がカンマで区切られて並んでいる」とあるため、空でない要素が存在すれば良い）

		hasValidPart := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				hasValidPart = true
				break
			}
		}
		
		// 末尾のカンマのみの場合 ("1," -> ["1", ""]) は妥当とみなす（1個以上の数字列が存在する）
		// 「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすには、
		// 少なくとも1つの非空の要素が存在すればよい。
		if hasValidPart {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
