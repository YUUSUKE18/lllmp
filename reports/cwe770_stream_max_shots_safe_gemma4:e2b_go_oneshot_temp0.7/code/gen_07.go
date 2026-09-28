package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var line string
	// 標準入力から一行読み込む
	if _, err := fmt.Scanln(&line); err != nil && err.Error() != "unexpected newline" {
		// エラーが発生しても続行を試みる（例：空入力など）
		return
	}

	// カンマで分割
	parts := strings.Split(line, ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値（負の数も考慮するため）

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		// カウントと最大値を更新する
		count++
		if val > maxVal {
			maxVal = val
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
