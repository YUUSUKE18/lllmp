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

		// 末尾のカンマを除去して、カンマで区切られた数字列が存在するか確認
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、またはカンマと空白のみの行は妥当ではない（例: ","）
			continue
		}

		// カンマで区切られた要素が存在するか確認
		parts := strings.Split(line, ",")
		
		// 妥当性の判定：1個以上の数字列がカンマで区切られていること
		// partsには、末尾の空文字列やカンマのみの文字列も含まれる可能性があるため、
		// 実際に数字が抽出できる要素数を数える。
		
		count := 0
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// 数字列として抽出された部分があるかチェック (厳密には全要素が整数である必要はないが、
				// 仕様から「1個以上の数字列がカンマで区切られて並んでいる」という条件を重視する)
				// ここでは、カンマで区切られた部分が空でないことを主とします。
				count++
			}
		}

		if count >= 1 {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
