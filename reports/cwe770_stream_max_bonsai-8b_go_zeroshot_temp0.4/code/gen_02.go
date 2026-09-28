package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// stdinから入力を受け取る
	input, _ := strings.NewReader(os.Stdin)
	// 全体を分割する
	parts := strings.Split(input, ",")

	count := 0
	max := -1

	for _, part := range parts {
		// 空格をtrim
		trimmed := strings.TrimSpace(part)
		// 数値をチェック
		if len(trimmed) == 0 {
			continue
		}
		// 数値を変換
		num, err := strconv.Atoi(trimmed)
		if err != nil {
			continue
		}
		// 値が64bit整数の範囲に収まるかチェック
		if num > 1_844_674_407_370_955_161_6 || num < -1_844_674_407_370_955_161_6 {
			continue
		}
		// 記数を増やす
		count++
		// 最大値を更新
		if num > max {
			max = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
