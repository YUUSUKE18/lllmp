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
		// 入力が空の場合は何もしない
		return
	}

	line := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	// 整数として有効な値を格納するためのスライス
	var numbers []int

	for _, part := range parts {
		// 前後の空白を除去
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

		// 重複チェック
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbers = append(numbers, num)
		}
	}

	// 重複を除いた整数をソートする（問題文で順序の指定はないが、一貫性を保つため）
	sort.Ints(numbers)

	// 個数と合計を計算する
	count := len(numbers)
	var sum int64 = 0

	for _, num := range numbers {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
