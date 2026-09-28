package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	input := scanner.Text()

	// カンマで区切って各要素を分割する
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 空の文字列や前後の空白を無視
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// コロンで分割して値と回数を取得
		kv := strings.Split(trimmedPart, ":")
		if len(kv) != 2 {
			// 値:回数の形式でない場合は無視
			continue
		}

		// 値 (Value) の解析
		valueStr := strings.TrimSpace(kv[0])
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		if errV != nil {
			// 値が整数でない場合は無視
			continue
		}

		// 回数 (Count) の解析
		countStr := strings.TrimSpace(kv[1])
		count, errC := strconv.ParseInt(countStr, 10, 64)
		if errC != nil {
			// 回数が整数でない場合は無視
			continue
		}

		// 計算に加算
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
