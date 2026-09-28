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
		line := scanner.Text()
		// 行の前後の空白を無視する（ここでは行全体を処理するため、トリミングは不要だが、
		// 後の処理で文字列操作を行うため、念のため行全体を評価する）

		// 末尾の空白を除去して処理
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定ロジック
		// 1. 数字とカンマ以外を含む行は妥当ではない
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		
		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当な行の条件: 1個以上の数字列がカンマで区切られていること。
		// これは、分割された要素がすべて空でない（数字列が存在する）ことを意味する。
		// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」であり、
		// 空行は除外される。
		
		// 厳密に「数字列」のみで構成されているかを確認する。
		isValid := true
		for _, part := range parts {
			// 各部分が空でないことを確認する。
			// 空行は既にスキップされているため、ここでは数字列が存在するかを確認する。
			if part == "" {
				// 末尾のカンマや連続するカンマによって生じる空文字列は許容されるが、
				// 妥当なのは「1個以上の数字列」が区切られていること。
				// 例: "1,2," -> ["1", "2", ""]。これは妥当と見なされるべきか？
				// 仕様: 「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
				// これは、少なくとも1つの数字列が存在すれば良い、と解釈する。
				// 空行は除外される。
				continue
			}
			
			// 部分が数字列のみで構成されているかを確認する
			if !isNumeric(part) {
				isValid = false
				break
			}
		}

		if isValid {
			// 妥当な行としてカウントする
			validCount++
		}
	}

	// 結果の出力
	fmt.Printf("valid=%d\n", validCount)
}

// isNumeric は文字列が完全に整数（数字のみ）で構成されているかをチェックするヘルパー関数
func isNumeric(s string) bool {
	if s == "" {
		return false // 空文字列は数字列ではない
	}
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}
