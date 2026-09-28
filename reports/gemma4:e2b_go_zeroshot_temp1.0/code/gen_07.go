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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解析を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除外して格納
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// ソート（これは必須ではないが、個数と合計の計算のために明確化する）
	sort.Ints(uniqueList)

	// 個数と合計を計算
	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
