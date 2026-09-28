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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		// 入力エラーは無視するか、適切なエラー処理を行うが、ここでは簡略化のため続行する
		return
	}
	inputStr := string(input)

	// カンマで分割して整数列を取得
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	// 重複を除いた整数を格納するためのマップを使用
	uniqueNumbers := make(map[int64]struct{})

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
		uniqueNumbers[num] = struct{}{}
	}

	// 重複を除いた整数をスライスに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める
	count := len(uniqueList)

	// 合計を求める
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
