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
		// 入力が空の場合は何もしない
		fmt.Println("count=0 sum=0")
		return
	}
	line := scanner.Text()

	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで区切って各要素を処理
	parts := strings.Split(line, ",")

	for _, part := range parts {
		if part == "" {
			continue
		}
		// ":" で値と回数を分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			// 形式が不正な場合は無視
			continue
		}

		// 値 (値) を取得
		valueStr := strings.TrimSpace(kv[0])
		// 回数 (回数) を取得
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が有効な整数であるかチェック
		var value int64
		var count int64
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV == nil && errC == nil && count >= 0 {
			// 要素数に加算
			totalCount += int64(value) * int64(count)
			// 合計に加算
			totalSum += int64(value) * int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
