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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む（ここでは一時的にファイルとして扱うか、直接Scannerを使う方が一般的だが、指定に従う）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	// カンマで分割して整数列を得る
	parts := strings.Split(data, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]bool)
	
	// 有効な整数のみを抽出する
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		uniqueNumbers[n] = true
	}

	// 重複を除いた整数をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を計算
	count := len(uniqueList)

	// 合計を計算（64bit整数の範囲に収まる）
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
