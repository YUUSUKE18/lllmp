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
			// 末尾のカンマのみの行は妥当とする（例: "1,2," -> "1,2"）
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// 末尾のカンマは許容される。
			// 例: "1,2," は妥当。"1," は妥当。
			// 空行は妥当ではない。
			// 空白のみの行は妥当ではない。
			// ここでは、カンマで区切られた後に数字が1つ以上存在するかどうかをチェックする。
			// 末尾のカンマがあっても、数字が1つ以上あれば妥当とする。
			// ただし、数字とカンマ以外を含む行は妥当ではない。

			// 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」をチェックする。
			// 1. 数字とカンマ以外を含む行はNG
			// 2. 空行はNG
			// 3. 妥当な行は、カンマで区切られた数字の集合が1つ以上存在すること。

			// 処理を再定義: 行をカンマで分割し、各要素が数字であることを確認する。
			parts := strings.Split(line, ",")
			
			// 末尾のカンマが許容されるため、最後の要素が空文字列になる可能性がある。
			// 例: "1,2," -> ["1", "2", ""]
			
			hasDigits := false
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart != "" {
					// 数字列であるかチェック
					if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
						hasDigits = true
					} else {
						// 数字以外の文字が含まれている場合、この行は妥当ではない
						hasDigits = false // 既に数字が見つかっていればOKだが、ここでは厳密にチェック
						break
					}
				}
			}

			// 最後の要素が空文字列であっても、それ以前に数字があればOK。
			// ただし、" , " のようなケースはNG。
			// "1," -> ["1", ""]。1は数字。妥当。
			// "," -> ["", ""]。数字なし。不妥当。
			// "abc" -> ["abc"]。数字ではない。不妥当。

			// 妥当性の判定をシンプルにするため、数字のみで構成されているか、または数字とカンマのみで構成されているかをチェックする。
			
			isValid := true
			for _, part := range parts {
				// 各部分が数字のみ（または空文字列）であることを確認
				if strings.TrimSpace(part) != "" {
					// 数字としてパースできるか試みる
					if _, err := fmt.Sscanf(strings.TrimSpace(part), "%d"); err != nil {
						isValid = false
						break
					}
				}
			}

			if isValid {
				// 1個以上の数字列がカンマで区切られているか？
				// 空行はNGなので、lineが空でなければ、少なくとも1つの要素がある。
				// 妥当なのは、数字が1つ以上含まれている場合。
				
				// 念のため、数字が1つ以上含まれているかを確認する。
				hasAnyDigit := false
				for _, part := range parts {
					if strings.TrimSpace(part) != "" {
						// 数字としてパースできるか再確認
						if _, err := fmt.Sscanf(strings.TrimSpace(part), "%d"); err == nil {
							hasAnyDigit = true
						} else {
							// 数字以外の文字が含まれていた場合、isValidがfalseになるはずだが、念のため
							isValid = false
							break
						}
					}
				}
				
				if hasAnyDigit {
					validLines++
				} else {
					// カンマのみ、または数字を含まない（例: ",,"）
					// これは「1個以上の数字列」を満たさないため不妥当。
					// ただし、"1," は妥当。
					// "1," -> parts=["1", ""]. hasAnyDigit=true. OK.
					// "," -> parts=["", ""]. hasAnyDigit=false. NG.
					// "abc" -> parts=["abc"]. isValid=false. NG.
					
					// 妥当な行の定義に厳密に従う。
					// 1個以上の数字列がカンマで区切られて並んでいる。
					// これは、カンマで区切られた要素のうち、数字としてパースできるものが1つ以上存在すれば良い。
					
					// 上記の hasAnyDigit の判定で十分であると判断する。
					// 妥当な行のカウントは、hasAnyDigitがtrueの場合のみ行う。
				}
			}
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
