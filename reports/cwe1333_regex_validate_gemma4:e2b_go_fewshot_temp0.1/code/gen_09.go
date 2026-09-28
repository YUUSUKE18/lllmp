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

		// 末尾のカンマを削除してチェック
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（trimSpaceで既にチェック済みだが念のため）
			// 末尾のカンマのみの行は妥当とする（例: "1,2," の場合、"1,2," は妥当）
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// 末尾のカンマは許容される。
			// 空行は妥当ではない、という条件があるので、ここでは数字列が一つでも存在するかをチェックする。
			// 厳密に「数字列が1個以上」をチェックする。
			// 末尾のカンマがあっても、数字列が存在すれば妥当とする。
			// 例: "1," -> trimmedLine は "1" -> 妥当
			// 例: "," -> trimmedLine は "" -> 不妥当
			if strings.Contains(line, ",") {
				// カンマが含まれていて、かつ数字列が存在する場合
				if strings.Contains(trimmedLine, "") {
					// カンマのみの場合 (例: "," または ",," など) は不妥当
					// ただし、"1," のように数字列が存在すればOK
					// 妥当性の判定を「数字列が1個以上」に絞る。
					// 妥当なのは、カンマで区切られた数字列が存在する場合。
					// 少なくとも1つの数字列が存在するかどうかをチェックする。
					
					// カンマで分割して、空でない要素が1つ以上あれば妥当
					parts := strings.Split(line, ",")
					hasNumber := false
					for _, part := range parts {
						if strings.TrimSpace(part) != "" {
							hasNumber = true
							break
						}
					}
					if hasNumber {
						validLines++
					}
				}
			} else {
				// カンマを含まない場合、数字列のみ
				if strings.TrimSpace(line) != "" {
					validLines++
				}
			}

		} else {
			// カンマを含む行の場合
			parts := strings.Split(line, ",")
			hasNumber := false
			for _, part := range parts {
				if strings.TrimSpace(part) != "" {
					hasNumber = true
				}
			}
			if hasNumber {
				validLines++
			}
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
