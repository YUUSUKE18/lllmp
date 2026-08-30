package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して文字列のスライスを得る
	fields := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)
	var totalSum int64 = 0

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外して処理
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			totalSum += n
		}
	}

	// 個数を求める (マップの要素数)
	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
