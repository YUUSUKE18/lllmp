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
	line := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]struct{})

	// 整数をフィルタリングし、重複を除いたものを収集する
	for _, part := range parts {
		// 前後の空白を削除
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

		// 重複を除いてマップに追加
		uniqueNumbers[num] = struct{}{}
	}

	// 重複を除いた数値をスライスに変換
	var uniqueNums []int
	for num := range uniqueNumbers {
		uniqueNums = append(uniqueNums, num)
	}

	// 個数と合計を計算する
	count := len(uniqueNums)
	var sum int64 = 0

	for _, num := range uniqueNums {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
