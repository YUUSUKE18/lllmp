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

	count := 0
	sum := int64(0)

	// カンマで区切って各要素を処理
	parts := strings.Split(data, ",")

	for _, part := range parts {
		if part == "" {
			continue
		}
		// ':' で分割して値と回数を取得
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が有効な整数か確認
		value, errV := fmt.Sscanf(valueStr, "%d")
		countVal, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue // 整数に変換できない場合は無視
		}

		valueInt := 0
		countInt := 0
		_, errV = fmt.Sscanf(valueStr, "%d", &valueInt)
		_, errC = fmt.Sscanf(countStr, "%d", &countInt)

		if errV == nil && errC == nil && countInt >= 0 {
			// 値:回数 の形式で処理
			for i := 0; i < countInt; i++ {
				sum += int64(valueInt)
			}
			count += countInt
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
