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
	input, err := os.ReadFile(0) // os.ReadFile(0) は標準入力からの読み込みに相当するが、ここではbufioを使う方が一般的で安全
	if err != nil {
		return
	}
	data := string(input)

	// 入力をカンマで分割する
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// セットに追加（重複を除去）
		uniqueNumbers[num] = true
	}

	// 重複を除いた要素をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するためにソートする（必須ではないが、処理の明確化や後続処理のため）
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	// 合計を計算
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
