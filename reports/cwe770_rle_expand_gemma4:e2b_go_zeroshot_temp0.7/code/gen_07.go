package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 数値に変換
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // パースエラーの場合は無視
		}

		// 回数が 0 以上であることを確認 (仕様上は回数は 0 以上とあるが、念のため)
		if count >= 0 {
			// 要素数に加算
			totalCount += count
			// 合計に加算 (値 * 回数)
			totalSum += value * count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
