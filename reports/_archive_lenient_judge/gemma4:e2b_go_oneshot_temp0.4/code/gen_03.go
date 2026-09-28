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
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーは無視するか、適切なエラー処理を行うが、ここでは単純化のため終了する
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(inputStr, ",")

	// 重複を除いた整数を格納するセット（mapを使用）
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

		// 重複を除外して記録する
		uniqueNumbers[n] = true
	}

	// 重複を除いた要素をスライスに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を計算する
	count := len(uniqueList)

	// 合計を計算する (64bitで収まることを前提とする)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
