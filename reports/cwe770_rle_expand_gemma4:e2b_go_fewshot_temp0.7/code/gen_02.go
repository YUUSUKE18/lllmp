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
		// 各部分から "値:回数" の形式を解析
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

		// 値と回数を整数に変換
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil || value == 0 || count == 0 {
			// 整数変換に失敗した、または値や回数が0の場合は無視（仕様上回数は0以上だが、ここでは有効なデータのみをカウント）
			continue
		}

		// 値を count 回加算
		valueInt := int64(value)
		countInt := int64(count)

		totalCount += countInt
		totalSum += valueInt * countInt
	}

	// 厳密に count=<要素数> sum=<合計> の1行を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
