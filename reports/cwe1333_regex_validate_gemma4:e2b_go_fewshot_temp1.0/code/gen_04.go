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

		// 末尾のカンマを除去してから分割
		trimmedLine := strings.TrimRight(line, ",")
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定: 1個以上の数字列がカンマで区切られているか
		// partsが空でないこと、そして各部分が数字列のみである（または数字列とカンマのみで構成されていること）をチェックする必要があるが、
		// 仕様によれば「1 個以上の数字列がカンマで区切られて並んでいること」が求められている。
		// 空でない要素が1つ以上あれば、それは数字列（あるいは数字列の塊）として扱われる。
		// ここでは、空でない要素が1つ以上あれば妥当とみなす。
		if len(parts) > 0 {
			// 末尾のカンマが許容されるため、元の行が空でなかったことと、分割結果が何かしらの要素を含んでいることを確認する。
			// もし元の行が "1,2," のような形式であれば、parts は ["1", "2", ""] となる。len(parts) >= 1 は常に真。
			// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
			// 空でないフィールドが存在すれば、それは数字列として扱われる。
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
	}

	fmt.Printf("valid=%d\n", validLines)
}
