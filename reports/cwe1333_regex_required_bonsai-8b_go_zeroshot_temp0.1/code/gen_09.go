package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// リアルタイムの stdinを読み取る
	input := strings.NewReader(os.Stdin)

	for {
		input.Readline(buf)
		if len(buf) == 0 {
			break
		}

		// 空行を無視
		if strings.TrimSpace(buf) == "" {
			continue
		}

		// ラベルと値の区切り
		parts := strings.Split(buf, ",")
		if len(parts) < 2 {
			continue
		}

		// パーツの各要素が数字
		valid := true
		for _, part := range parts {
			if !regexp.MatchString(`^\d+$`, part) {
				valid = false
				break
			}
		}

		if valid {
			validLines = append(validLines, strings.TrimSpace(buf))
		}
	}

	// 最大の妥当行数を取得
	maxValid := len(validLines)

	// 最大の妥当行数を出力
	fmt.Printf("valid=%d\n", maxValid)
}
