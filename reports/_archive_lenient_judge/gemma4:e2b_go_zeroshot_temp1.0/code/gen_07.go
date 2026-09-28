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

	// カンマで分割して整数を抽出
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ（集合として機能させる）
	uniqueNumbers := make(map[int]struct{})

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除いた整数として記録
		uniqueNumbers[num] = struct{}{}
	}

	// 重複を除いた整数をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するため、ソート（任意だが処理を整理）
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		// 合計は64bit整数で保持する
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
