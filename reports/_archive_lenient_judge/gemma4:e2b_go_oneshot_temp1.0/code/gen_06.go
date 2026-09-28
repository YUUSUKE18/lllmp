package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から1行読み込む
	input, err := os.ReadFile(0) // os.Stdinに対応させるため、ここでは直接読み込みを試みるか、bufioを使う
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")

	// 重複を除いた集合を作成し、合計を計算
	seen := make(map[int64]bool)
	var count int64 = 0
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェック
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}

	// 指定された形式で結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
