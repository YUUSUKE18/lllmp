package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	line := strings.TrimSpace(string(input))

	if line == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割する
	fields := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数範囲を考慮し、初期値は非常に小さい値に設定（または最初の要素で上書き）

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換する
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
