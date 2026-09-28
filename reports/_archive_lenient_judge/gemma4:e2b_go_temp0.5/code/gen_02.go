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
		return // 入力が空の場合は終了
	}
	line := scanner.Text()

	// カンマで分割し、文字列のスライスを取得
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用（重複排除のため）
	uniqueNumbers := make(map[int]bool)

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

		// 重複をチェックし、マップに追加
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をスライスに変換
	var uniqueInts []int
	for num := range uniqueNumbers {
		uniqueInts = append(uniqueInts, num)
	}

	// 個数を求める
	count := len(uniqueInts)

	// 合計を求める (64bit整数として扱うため int64 を使用)
	var sum int64 = 0
	for _, num := range uniqueInts {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
