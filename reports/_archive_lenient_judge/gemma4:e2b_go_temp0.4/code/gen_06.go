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

	// 重複を除いた整数を格納するためのマップを使用する（重複排除のため）
	uniqueNumbers := make(map[int]bool)
	var numbersToProcess []int

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと格納
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbersToProcess = append(numbersToProcess, num)
		}
	}

	// 処理した重複のない整数をソートする（必須ではないが、一貫性を保つため）
	sort.Ints(numbersToProcess)

	// 個数と合計を計算する
	count := len(numbersToProcess)
	var sum int64 = 0

	for _, num := range numbersToProcess {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
