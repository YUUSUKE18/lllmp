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

	// カンマで分割して各要素を処理
	parts := strings.Split(data, ",")

	var count int64 = 0
	var sum int64 = 0

	for _, part := range parts {
		// ":", で分割して値と回数を取得
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が数値として有効かチェック
		value, err1 := fmt.Sscan(strings.NewReader(valueStr))
		count, err2 := fmt.Sscan(strings.NewReader(countStr))

		if err1 != nil || err2 != nil {
			continue
		}

		v := int64(value)
		c := int64(count)

		// 回数が0以上であることを確認 (仕様上は回数は0以上だが、安全のため)
		if c >= 0 {
			count += c
			sum += v * c
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
