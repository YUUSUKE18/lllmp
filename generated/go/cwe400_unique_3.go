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

	// カンマで分割し、文字列の配列を得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用する (セットとして機能させるため)
	uniqueNumbers := make(map[int]bool)

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

		// 重複を除いて記録
		uniqueNumbers[num] = true
	}

	// ユニークな整数をスライスに変換する
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

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
