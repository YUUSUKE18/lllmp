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
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が有効な整数であるか確認
		var value int64
		var count int64
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV != nil || errC != nil {
			continue // 整数に変換できない場合は無視
		}

		// 回数が0以上であることを確認（仕様上は回数は0以上とあるが、念のため）
		if count < 0 {
			continue
		}

		// 合計と要素数を加算
		totalCount += int64(value) * count
		totalSum += int64(value) * count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
