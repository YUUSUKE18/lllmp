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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数を抽出
	parts := strings.Split(data, ",")
	uniqueNumbers := make(map[int64]bool)
	var uniqueList []int64

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			uniqueList = append(uniqueList, num)
		}
	}

	// 個数と合計を計算
	count := len(uniqueList)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
