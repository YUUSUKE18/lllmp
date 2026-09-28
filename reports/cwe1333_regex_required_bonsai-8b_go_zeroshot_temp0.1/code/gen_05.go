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

		// 空行や不正な形式の行を処理
		input = strings.TrimSpace(input)
		if len(input) == 0 {
			continue
		}

		// カンマ区切りの整数列を正規表現で検証
		// ルール:
		// - 1 個以上の数字列
		// - カンマで区切られた
		// - 末尾のカンマは許容
		// - 空格や他の非数字を含まない
		// - ルールを満たす行はvalidLinesに追加
		if re.MatchString(input) {
			validLines = append(validLines, input)
		}
	}

	// 最終出力
	fmt.Printf("valid=%d\n", len(validLines))
}
