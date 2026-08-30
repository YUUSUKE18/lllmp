package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}
	data := string(input)

	var totalSum int64 = 0
	var count int64 = 0

	// カンマで区切られた各要素を処理
	parts := strings.Split(strings.TrimSpace(data), ",")

	for _, part := range parts {
		if part == "" {
			continue
		}
		// ':' で分割して値と回数を取得
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合はスキップ
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		var value int64
		var count int64

		// 値と回数を整数に変換
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV != nil || errC != nil {
			continue // 変換エラーがあればスキップ
		}

		// 回数が0以上であることを確認（仕様上、回数は0以上だが、読み取りエラーでスキップされた場合は無視）
		if count >= 0 {
			// 合計を計算
			totalSum += value * count
			// 要素数を計算
			count += count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
