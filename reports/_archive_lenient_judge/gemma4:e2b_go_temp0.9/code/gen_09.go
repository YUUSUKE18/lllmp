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
	// 標準入力から一行全体を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// ファイル読み込みエラー（通常は問題ないが念のため）
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割し、各要素を整数として処理する
	parts := strings.Split(data, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除外
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をスライスに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算する準備（問題文の仕様上、ここでは単にユニークな要素を数え、その合計を求める）
	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
