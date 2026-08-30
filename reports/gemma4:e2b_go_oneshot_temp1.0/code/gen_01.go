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
	// 標準入力から1行読み込む
	input, err := os.ReadFile(0) // os.Stdin の内容を直接読み込む代わりに、ここでは一般的な方法で処理
	if err != nil && len(input) == 0 {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}

	// 読み込んだ文字列を処理する
	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割し、各要素を処理
	fields := strings.Split(data, ",")

	// 重複を除いた整数を格納するセット
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
