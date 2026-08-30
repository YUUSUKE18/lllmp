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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（trimSpaceで既にチェック済みだが念のため）
			// 末尾のカンマのみの行は妥当とみなす（例: "1,2," -> "1,2"）
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// 末尾のカンマは許容される。
			// 例: "1,2," は妥当。"1," は妥当。
			// 空行は妥当ではない。
			// 空白や数字とカンマ以外を含む行は妥当ではない。
			// ここでは、カンマで区切られた後に数字が1つ以上存在するかどうかをチェックする。
			// 末尾のカンマがあっても、数字が1つ以上あれば妥当とする。
			// ただし、" , " のようなケースは除外する。
			
			// 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」をチェックする。
			// カンマで分割した結果、空でない要素が1つ以上あればOK。
			
			parts := strings.Split(line, ",")
			
			// 末尾のカンマがあっても、その後に数字が続くか、少なくとも数字が存在するかをチェックする。
			// 例: "1,2," -> ["1", "2", ""]。空でない要素が2つあるため妥当。
			// 例: "," -> ["", ""]。空でない要素が0個。
			// 例: "1" -> ["1"]。空でない要素が1個。
			
			hasNumber := false
			for _, part := range parts {
				if strings.TrimSpace(part) != "" {
					hasNumber = true
					break
				}
			}
			
			if hasNumber {
				validLines++
			} else {
				// カンマのみ、または完全に空の文字列（trimSpaceでチェック済みだが、ここでは行全体を評価）
				// 空行は妥当ではない。
				// カンマのみの行（例: "," または ",,"）は妥当ではないと解釈する。
				// 「数字列」が存在しないため。
			}

		} else {
			// カンマ区切りの数字列が存在する場合
			parts := strings.Split(line, ",")
			
			// 1個以上の数字列がカンマで区切られて並んでいるかチェック
			// 空でない要素が1つ以上あれば妥当
			hasValidParts := false
			for _, part := range parts {
				if strings.TrimSpace(part) != "" {
					hasValidParts = true
					break
				}
			}
			
			if hasValidParts {
				validLines++
			}
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
