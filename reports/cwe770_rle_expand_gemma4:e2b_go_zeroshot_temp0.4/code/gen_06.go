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
	input := scanner.Text()

	// カンマで分割して各要素を処理
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 値と回数をコロンで分割
		pair := strings.Split(part, ":")
		if len(pair) != 2 {
			continue // 形式が不正な場合は無視
		}

		var valueStr, countStr string
		_, err1 := fmt.Sscanf(pair[0], "%s", &valueStr)
		_, err2 := fmt.Sscanf(pair[1], "%s", &countStr)

		if err1 != nil || err2 != nil {
			continue // パースエラーの場合は無視
		}

		var value int64
		var count int64
		_, err := fmt.Sscanf(valueStr, "%d", &value)
		_, err = fmt.Sscanf(countStr, "%d", &count)

		if err != nil {
			continue // 整数への変換エラーの場合は無視
		}

		// 回数が0以上であることを確認（仕様上は回数は0以上）
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
