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

	// カンマで区切って各要素を処理する
	parts := strings.Split(strings.TrimSpace(data), ",")

	for _, part := range parts {
		// ": " で分割する
		partsStr := strings.Split(strings.TrimSpace(part), ":")
		if len(partsStr) != 2 {
			continue
		}

		// 値と回数をパースする
		valueStr := strings.TrimSpace(partsStr[0])
		countStr := strings.TrimSpace(partsStr[1])

		var value int64
		var countInt int64

		// 値を int64 に変換
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		if errV != nil {
			continue
		}

		// 回数を int64 に変換
		_, errC := fmt.Sscanf(countStr, "%d", &countInt)
		if errC != nil {
			continue
		}

		if countInt > 0 {
			// 要素数に加算
			count += int(countInt)
			// 合計に加算 (値 * 回数)
			sum += value * int64(countInt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
