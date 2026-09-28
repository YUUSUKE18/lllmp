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
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力がない場合は終了
	}
	line := scanner.Text()

	// カンマで分割して文字列のスライスを取得
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用
	uniqueNumbers := make(map[int]bool)

	// 各要素を処理し、重複を除いた整数を抽出する
	for _, part := range parts {
		// 前後の空白をトリム
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

		// マップに追加して重複を排除する
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をスライスに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算する
	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
