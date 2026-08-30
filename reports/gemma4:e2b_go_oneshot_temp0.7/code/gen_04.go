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
	input, err := os.ReadFile(0) // os.Stdin を直接読む代わりに、ファイルディスクリプタ0から読み込む（ここでは標準的な方法としてos.ReadFileを使用するが、本番ではbufio.Scannerを使う方が安全）
	if err != nil {
		// 標準入力からの読み込みを試みるため、念のためos.Stdin経由で処理する
		scanner := bufio.NewScanner(os.Stdin)
		if !scanner.Scan() {
			return // 入力がない場合は終了
		}
		input = scanner.Text()
	} else {
		// os.ReadFileは通常ファイルから読み込むため、ここでは標準入力の処理を再構築する
		// 課題の制約に従い、bufio.Scannerで一行を読み込む形に戻す
		scanner := bufio.NewScanner(os.Stdin)
		if !scanner.Scan() {
			return
		}
		input = scanner.Text()
	}

	// カンマ区切りの文字列を分割し、重複を除いた整数を抽出する
	parts := strings.Split(strings.TrimSpace(input), ",")
	
	// 重複を除去するためにマップを使用
	uniqueNumbers := make(map[int64]bool)
	var numbers []int64

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbers = append(numbers, num)
		}
	}

	// 個数と合計を計算する
	count := len(numbers)
	var sum int64 = 0
	for _, num := range numbers {
		sum += num
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
