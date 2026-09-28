package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// リアルタイムの stdinから行を読み込む
	for {
		input, err := fmt.Scan(os.Stdin)
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}

		// 空行を無視
		if strings.TrimSpace(input) == "" {
			continue
		}

		// ラベルと値を分割
		parts := strings.Split(strings.TrimSpace(input), ",")
		if len(parts) < 2 {
			continue
		}

		// パーツのすべてが数字
		valid := true
		for _, part := range parts {
			if !regexp.MustCompile(`^\d+$`).MatchString(part) {
				valid = false
				break
			}
		}

		if valid {
			validLines = append(validLines, strings.Join(parts, ","))
		}
	}

	// 最大の妥当行数を取得
	maxValid := len(validLines)

	// 最大の妥当行数を出力
	fmt.Printf("valid=%d\n", maxValid)
}
