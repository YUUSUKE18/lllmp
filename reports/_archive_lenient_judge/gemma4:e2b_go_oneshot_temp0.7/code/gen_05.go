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
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここでは標準的な方法で処理するが、本番ではbufio.Scannerを使うのが一般的。ただし、与えられた例の形式に合わせるため、今回はファイル読み込みを避ける。

	// 標準入力から全て読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何もしない
		return
	}
	line := scanner.Text()

	// カンマで分割して整数を抽出する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップと、重複を除いたリスト
	seen := make(map[int64]bool)
	var distinctNumbers []int64

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェック
		if !seen[n] {
			seen[n] = true
			distinctNumbers = append(distinctNumbers, n)
		}
	}

	// 個数と合計を計算する
	count := len(distinctNumbers)
	var sum int64 = 0
	for _, num := range distinctNumbers {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
