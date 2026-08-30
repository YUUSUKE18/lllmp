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
		return // 入力エラーは無視（通常、競技プログラミングでは想定されないことが多い）
	}
	data := string(input)

	// カンマで分割して整数列を取得
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}
		uniqueNumbers[n] = true
	}

	// 重複を除いた整数をソートして個数と合計を計算
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	sort.Slice(uniqueList, func(i, j int) bool {
		return uniqueList[i] < uniqueList[j]
	})

	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		sum += num
	}

	// 指定された形式で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
