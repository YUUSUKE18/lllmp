package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}

	inputLine := scanner.Text()

	// カンマで分割して整数列を得る
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ（集合として機能させるため）
	seen := make(map[int]bool)
	var uniqueNumbers []int

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと格納
		if !seen[num] {
			seen[num] = true
			uniqueNumbers = append(uniqueNumbers, num)
		}
	}

	// 個数と合計を計算する
	count := len(uniqueNumbers)
	var sum int64 = 0

	for _, num := range uniqueNumbers {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
