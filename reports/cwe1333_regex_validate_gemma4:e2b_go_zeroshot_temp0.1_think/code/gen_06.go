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
		
		// 1. 行の前後の空白を無視する
		trimmedLine := strings.TrimSpace(line)

		// 2. 空行は妥当ではない
		if trimmedLine == "" {
			continue
		}

		// 3. 数字とカンマ、空白以外を含む行は妥当ではない
		isValidContent := true
		for _, char := range trimmedLine {
			// 許可される文字は数字, カンマ, スペースのみ
			if !strings.ContainsRune("0123456789, ", char) {
				isValidContent = false
				break
			}
		}
		if !isValidContent {
			continue
		}

		// 4. 1個以上の数字列がカンマで区切られて並んでいること (カンマの存在チェック)
		// 末尾のカンマは許容されるため、カンマが一つでも存在すれば妥当とする。
		if strings.Contains(trimmedLine, ",") {
			validCount++
		}
	}

	// 5. 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
