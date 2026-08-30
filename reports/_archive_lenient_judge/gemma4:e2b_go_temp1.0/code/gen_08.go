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
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割して文字列の配列にする
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップを使用する（セットとして機能させるため）
	uniqueNumbersMap := make(map[int]bool)

	// 整数をフィルタリングし、重複を除いてセットに格納する
	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// マップに挿入して重複を除外する
		uniqueNumbersMap[num] = true
	}

	// 重複を除いた整数をリストに変換する
	var uniqueNumbers []int
	for num := range uniqueNumbersMap {
		uniqueNumbers = append(uniqueNumbers, num)
	}

	// 合計を計算する
	var sum int64 = 0
	for _, num := range uniqueNumbers {
		// 合計は64bit整数の範囲に収まることが保証されている（個数と合計の制約）
		sum += int64(num)
	}

	// 個数を求める
	count := len(uniqueNumbers)

	// 結果を出力する: count=<個数> sum=<合計>
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
