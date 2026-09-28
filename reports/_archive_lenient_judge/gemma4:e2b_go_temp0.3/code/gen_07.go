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
		// 入力が空の場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用する (重複排除のため)
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白をトリムする
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

		// 重複チェックと格納
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換する
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数と合計を計算するためにソートする (必須ではないが、処理の明確化のため)
	sort.Ints(uniqueList)

	count := len(uniqueList)
	var sum int64 = 0

	// 合計を計算する (int64として扱う)
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
