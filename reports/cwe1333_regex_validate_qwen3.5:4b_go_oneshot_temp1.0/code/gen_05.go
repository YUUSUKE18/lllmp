package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	lineNum := 0

	for sc.Scan() {
		lineNum++
		text := strings.TrimSpace(sc.Text())
		if text == "" {
			continue // 空行は妥当ではないためカウントしない
		}

		parts := strings.Split(text, ",")
		isValid := true

		// 部分が 1 個以上あるか確認
		if len(parts) == 0 {
			isValid = false
		} else {
			// 各要素を整数に変換して検証
			for _, part := range parts {
				if part == "" {
					// カンマの前後に空白がないか (TrimSpace で空になるなら無視せず、エラー扱い？)
					// 「数字列」とは「0, 1」のように文字だけではないので、空白を含むと妥当でない。
					isValid = false
					break
				}
				n, err := strconv.Atoi(part)
				if err != nil {
					isValid = false
					break
				}
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
