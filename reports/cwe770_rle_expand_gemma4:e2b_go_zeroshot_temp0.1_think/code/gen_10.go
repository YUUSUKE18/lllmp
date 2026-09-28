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
		// 入力がない場合は終了
		return
	}
	input := scanner.Text()

	// カンマで区切って個々のランレングス定義を分割する
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// 空の文字列や前後の空白を無視
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// コロンで値と回数を分割する
		kv := strings.Split(trimmedPart, ":")
		if len(kv) != 2 {
			// 形式が不正な場合は無視
			continue
		}

		// 値 (Value) を取得
		valueStr := strings.TrimSpace(kv[0])
		value, errV := strconv.ParseInt(valueStr, 10, 64)
		if errV != nil {
			// 値のパースに失敗した場合は無視
			continue
		}

		// 回数 (Count) を取得
		countStr := strings.TrimSpace(kv[1])
		count, errC := strconv.ParseInt(countStr, 10, 64)
		if errC != nil {
			// 回数のパースに失敗した場合は無視
			continue
		}

		// 計算に加算する
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
