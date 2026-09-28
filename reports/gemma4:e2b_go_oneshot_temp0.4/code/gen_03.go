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
	input, err := os.ReadFile(0) // os.Stdinの読み込みを直接行うため、ここではファイルディスクリプタ0を使用するが、bufio.Scannerを使う方が一般的で安全。
	if err != nil {
		return
	}
	data := string(input)

	// カンマ区切りの文字列を分割して整数列を得る
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int64]bool)

	for _, part := range parts {
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

		// 重複を除外して格納
		uniqueNumbers[n] = true
	}

	// ユニークな整数をスライスに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める
	count := len(uniqueList)

	// 合計を求める (64bit整数として計算)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
