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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力がない場合は終了
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用する (重複排除のため)
	uniqueNumbers := make(map[int64]bool)

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと格納
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をリストに変換する
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める
	count := int64(len(uniqueList))

	// 合計を求める
	var sum int64
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を標準出力に出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
