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
	input, err := os.ReadFile(0) // os.Stdinのデータを読み込む（ここではファイルディスクリプタ0を使用）
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、各要素を処理する
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ
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

		// 重複を除外してマップに追加
		uniqueNumbers[n] = true
	}

	// 重複を除いた整数をリストに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を計算
	count := len(uniqueList)

	// 合計を計算 (64bit整数の範囲に収まるため int64 を使用)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
