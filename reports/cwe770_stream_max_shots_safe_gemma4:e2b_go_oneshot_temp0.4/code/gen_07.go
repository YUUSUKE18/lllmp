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
	input, err := os.ReadFile(0) // os.Stdin の内容を直接読み込む（よりシンプルに）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(data, ",")

	var count int = 0
	var max int64 = -1 // 最小値として非常に小さい値を初期化（64bit範囲内を考慮）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if num > max {
			max = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
