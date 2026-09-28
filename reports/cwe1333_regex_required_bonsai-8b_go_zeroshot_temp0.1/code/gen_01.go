package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// リアルタイムの stdinから行を読み込む
	for {
		input, err := fmt.ScanLine(os.Stdin)
		if err != nil {
			break
		}

		// 空行を無視
		if strings.TrimSpace(input) == "" {
			continue
		}

		// ラベルを除去
		input = strings.ReplaceAll(input, "valid=", "")

		// カンマ区切りの整数列を正規表現で検証
		if re.MatchString(input) {
			validLines = append(validLines, input)
		}
	}

	// 最終的に、妥当な行数を出力
	fmt.Println(strings.Join(validLines, "\n"))
}
