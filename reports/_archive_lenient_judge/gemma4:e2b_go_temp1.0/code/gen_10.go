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
		// 入力が空の場合は何もしない
		return
	}
	inputLine := scanner.Text()

	// カンマで分割する
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップを使用する（重複の除去のため）
	uniqueNumbers := make(map[int64]bool)
	
	// 整数として有効なものだけを抽出する
	var numbers []int64

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複のチェックと格納
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbers = append(numbers, num)
		}
	}

	// 合計を計算する
	var sum int64 = 0
	for _, num := range numbers {
		sum += num
	}

	// 個数を取得する (mapの要素数ではなく、重複を除いたリストの長さを利用)
	count := int64(len(numbers))

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
