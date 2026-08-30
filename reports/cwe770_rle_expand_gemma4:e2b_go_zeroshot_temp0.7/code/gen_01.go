package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割して各要素を処理
	parts := strings.Split(line, ",")
	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 値と回数をコロンで分割
		pair := strings.Split(strings.TrimSpace(part), ":")
		if len(pair) != 2 {
			continue // フォーマットが不正な場合は無視
		}

		// 値を整数に変換
		var value int64
		_, err := fmt.Sscanf(pair[0], "%d", &value)
		if err != nil {
			continue // 値が整数でない場合は無視
		}

		// 回数を整数に変換
		var count int64
		_, err = fmt.Sscanf(pair[1], "%d", &count)
		if err != nil {
			continue // 回数が整数でない場合は無視
		}

		// 回数が0以上であることを確認 (仕様で言及されていないが、ロジックとして安全性を高める)
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
