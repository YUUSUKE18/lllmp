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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割して文字列の配列にする
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ（セットとして使用）
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除いて格納
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換する
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するためにソートする（任意だが、処理の明確化のため）
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	// 合計を計算する (int64型を使用することで64bit範囲を保証)
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
