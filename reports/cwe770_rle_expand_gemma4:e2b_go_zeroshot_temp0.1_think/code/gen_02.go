package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーが発生した場合（通常は想定しないが念のため）
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで区切って要素を分割する
	parts := strings.Split(inputStr, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 各要素の前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 値と回数をコロンで分割する
		kv := strings.Split(trimmedPart, ":")
		if len(kv) != 2 {
			// 値:回数の形式でない場合は無視する
			continue
		}

		// 値 (Value) の解析
		valueStr := strings.TrimSpace(kv[0])
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		if errV != nil {
			// 値が整数でない場合は無視する
			continue
		}

		// 回数 (Count) の解析
		countStr := strings.TrimSpace(kv[1])
		count, errC := strconv.ParseInt(countStr, 10, 64)
		if errC != nil {
			// 回数が整数でない場合は無視する
			continue
		}

		// 計算と合計の更新
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
