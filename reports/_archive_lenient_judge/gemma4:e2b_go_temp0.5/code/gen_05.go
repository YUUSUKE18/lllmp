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
		// 入力が空の場合は何も出力しない
		return
	}
	inputLine := scanner.Text()

	// カンマで分割して整数を抽出する
	parts := strings.Split(inputLine, ",")

	// 重複を除いたユニークな整数を格納するためのマップを使用する
	uniqueNumbers := make(map[int]bool)

	for _, part := range parts {
		// 前後の空白を削除
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

		// 重複を除いた集合に追加
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 順序付け（任意だが、ソートは処理の安定性を高める）
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
