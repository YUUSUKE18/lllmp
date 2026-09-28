package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容する
		if strings.HasSuffix(line, ",") {
			// カンマで終わる場合、カンマを除いた部分が数字のみであるかを確認する必要がある
			// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことを求めている。
			// カンマ区切りの整数列の定義を「カンマで区切られたトークンがすべて整数であること」と解釈する。
			// 末尾のカンマが許容されるため、カンマを除いた部分をチェックする。
			trimmedLine := strings.TrimSuffix(line, ",")
			if trimmedLine != "" {
				parts := strings.Split(trimmedLine, ",")
				isValid := true
				for _, part := range parts {
					if _, err := fmt.Sscanf(part, "%d", &int(0)); err != nil {
						isValid = false
						break
					}
				}
				if isValid {
					validLines++
				}
			}
		} else {
			// カンマで終わらない場合、カンマ区切りで分割してすべて整数かを確認する
			parts := strings.Split(line, ",")
			if len(parts) == 0 {
				continue
			}

			isValid := true
			for _, part := range parts {
				// 空でないことを確認し、整数に変換可能か確認する
				if strings.TrimSpace(part) == "" {
					// カンマが連続している場合など、空の要素が出現する可能性がある。
					// ここでは、空の要素は許容しない（「数字列がカンマで区切られて並んでいる」ため）
					isValid = false
					break
				}
				// 整数としてパースを試みる
				var temp int
				_, err := fmt.Sscanf(part, "%d", &temp)
				if err != nil {
					isValid = false
					break
				}
			}

			if isValid {
				validLines++
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（今回は無視して終了）
	}

	fmt.Printf("valid=%d\n", validLines)
}
