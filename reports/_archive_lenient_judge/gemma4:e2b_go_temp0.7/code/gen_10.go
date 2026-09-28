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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して文字列の配列にする
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ（セットとして機能させるため）
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外してマップに追加
		uniqueNumbers[num] = true
	}

	// ユニークな整数をスライスに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める
	count := len(uniqueList)

	// 合計を求める (64bit整数の範囲に収まることを前提とする)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
