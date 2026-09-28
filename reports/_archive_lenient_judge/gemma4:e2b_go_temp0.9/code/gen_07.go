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
		// 入力が空の場合は何もせず終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割して整数列を取得する
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ（集合として使用）
	uniqueNumbers := make(map[int]bool)

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として解析を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除いてマップに追加
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換する
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 順序付け（必須ではないが、処理の安定化のため）
	sort.Ints(uniqueList)

	// 個数と合計を計算する
	count := len(uniqueList)
	var sum int64 = 0

	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
