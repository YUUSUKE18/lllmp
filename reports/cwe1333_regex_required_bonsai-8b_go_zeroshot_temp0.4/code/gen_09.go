package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// リアルタイムの stdinから行を読む
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

		// ラベルと値を分ける
		parts := strings.Split(strings.TrimSpace(input), ",")

		// ラベル以外の部分をチェック
		if len(parts) < 2 {
			continue
		}

		// ラベル以外の部分が数字
		valid := true
		for _, part := range parts[1:] {
			if !regexp.MustCompile(`^\d+$`).MatchString(part) {
				valid = false
				break
			}
		}

		if valid {
			validLines = append(validLines, strings.Join(parts, ","))
		}
	}

	// 最後の行を出力
	if len(validLines) > 0 {
		fmt.Println("valid=" + strings.Join(validLines, ","))
	}
}
