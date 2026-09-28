package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	// stdinを読み込む
	input, _ := fmt.ScanIn()

	for {
		// 空行を読む
		line, _ := fmt.Scan()

		// 空行または不正な形式の行をチェック
		if line == "" {
			break
		}

		// 空格とカンマ以外の文字を削除
		trimmed := strings.TrimSpace(line)
		if !trimmed || contains(trimmed, ",") || contains(trimmed, " ") {
			continue
		}

		// カンマで区切られた整数列を分割
		parts := strings.Split(trimmed, ",")

		// 1 個以上の数字列がある
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 最終の出力
	fmt.Printf("valid=%d\n", len(validLines))
}
