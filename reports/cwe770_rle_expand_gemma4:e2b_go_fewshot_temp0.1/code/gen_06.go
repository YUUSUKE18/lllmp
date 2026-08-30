package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで区切って各要素を処理
	parts := strings.Split(data, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数としてパース可能か確認
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue // パースエラーがあれば無視
		}

		// 値が正しくパースされたか確認（Sscanfは成功しても値が期待通りでない場合があるため、ここでは単純に整数として扱う）
		var val int
		var cnt int
		fmt.Sscanf(valueStr, "%d", &val)
		fmt.Sscanf(countStr, "%d", &cnt)

		// 回数が0以上であることを確認
		if cnt >= 0 {
			// 要素数に加算
			totalCount += int64(val) * int64(cnt)
			// 合計に加算
			totalSum += int64(val) * int64(cnt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
