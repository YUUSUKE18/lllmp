```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.ScanLine()
		if err != nil {
			break
		}

		// 空行や不正な形式をチェック
		if strings.TrimSpace(line) == "" {
			continue
		}

		// フォームットを正規表現でチェック
		if !regexp.MustCompile(`^[-+]?\d+(-?\d+)*$`).MatchString(line) {
			continue
		}

		// カンマで区切られた数字列があるかを確認
		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最後の行を出力
	fmt.Printf("valid=%d\n", len(validLines))
}
