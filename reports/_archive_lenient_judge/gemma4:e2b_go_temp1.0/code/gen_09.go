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
	input, err := os.ReadFile(0) // os.ReadFile(0) は標準入力から読み込むための一般的な方法ではないため、bufio.Readerを使用する
	if err != nil {
		// エラー処理（通常はコンテスト環境ではここでは詳細なエラー出力を行わないことが多いが、念のため）
		return
	}

	reader := bufio.NewReader(os.Stdin)
	// 標準入力全体を読み込む
	data, _ := reader.ReadString('\n')
	
	// 入力文字列から整数を抽出する
	fields := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップを使用し、Setの機能を実現する
	uniqueNumbers := make(map[int]bool)
	var numbers []int

	for _, field := range fields {
		field = strings.TrimSpace(field)
		if field == "" {
			continue
		}
		// 整数として解釈を試みる
		num, err := strconv.Atoi(field)
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

	// 求められた重複を除いた整数をソートする（合計計算のためには必須ではないが、処理の明確化に役立つ）
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
