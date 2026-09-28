package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して整数列を取得
	fields := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bitの最小値に近い大きな初期値（負の数を含む可能性があるため）

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// カウントと最大値を更新する
		count++
		if n > maxVal {
			maxVal = n
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
