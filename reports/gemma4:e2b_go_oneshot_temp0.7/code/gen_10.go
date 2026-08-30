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

	// カンマで分割し、各要素を処理する
	fields := strings.Split(strings.TrimSpace(data), ",")
	
	// 重複を除いた整数を格納するためのマップを使用
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

		// 重複チェックと合計の計算
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			totalSum += n
		}
	}

	// 個数を取得
	count := int64(len(uniqueNumbers))

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
