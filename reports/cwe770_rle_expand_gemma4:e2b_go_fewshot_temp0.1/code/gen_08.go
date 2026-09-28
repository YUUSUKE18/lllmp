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
		// 値:回数 の形式で分割
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数であるか確認
		value, err1 := fmt.Sscanf(valueStr, "%d")
		countInt, err2 := fmt.Sscanf(countStr, "%d")

		if err1 != nil || err2 != nil {
			continue // 整数に変換できない場合は無視
		}

		valueInt := 0
		countIntVal := 0
		_, err1 = fmt.Sscanf(valueStr, "%d", &valueInt)
		_, err2 = fmt.Sscanf(countStr, "%d", &countIntVal)

		if err1 != nil || err2 != nil {
			continue
		}

		// 回数が0以上であることを確認
		if countIntVal >= 0 {
			count += countIntVal
			sum += int64(valueInt) * int64(countIntVal)
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
