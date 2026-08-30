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
		// 入力がない場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割し、各要素を文字列として保持する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用する (セットとして機能させるため)
	uniqueNumbers := make(map[int]bool)

	for _, part := range parts {
		// 前後の空白をトリムする
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

		// 重複を除いた整数として記録する
		uniqueNumbers[num] = true
	}

	// ユニークな整数のリストを取得する
	var uniqueInts []int
	for num := range uniqueNumbers {
		uniqueInts = append(uniqueInts, num)
	}

	// 個数と合計を計算する
	count := len(uniqueInts)
	var sum int64 = 0

	for _, num := range uniqueInts {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
