package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力がない場合は終了
	}
	inputLine := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ（セットとして使用）
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白を削除
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
		uniqueNumbers[num] = true
	}

	// 個数と合計を計算する
	count := len(uniqueNumbers)
	var sum int64 = 0

	for num := range uniqueNumbers {
		sum += int64(num)
	}

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
