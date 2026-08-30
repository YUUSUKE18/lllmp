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
		// 値:回数の形式で分割
		kv := strings.Split(strings.TrimSpace(part), ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数として有効かチェック
		value, err1 := fmt.Sscanf(valueStr, "%d")
		countVal, err2 := fmt.Sscanf(countStr, "%d")

		if err1 != nil || err2 != nil {
			continue // 整数に変換できない場合は無視
		}

		// 値が正しく読み取れた場合
		valueInt := 0
		_, err1 = fmt.Sscanf(valueStr, "%d", &valueInt)
		if err1 != nil {
			continue
		}
		countInt := 0
		_, err2 = fmt.Sscanf(countStr, "%d", &countInt)
		if err2 != nil {
			continue
		}

		// 回数が0以上であることを確認
		if countInt >= 0 {
			count += countInt
			sum += int64(valueInt) * int64(countInt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
