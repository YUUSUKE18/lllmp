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
		// 入力が空の場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用する
	uniqueNumbers := make(map[int]bool)

	// 各要素を処理し、重複を除いた整数を収集する
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

	// 重複を除いた整数をスライスに変換する
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 合計を計算する
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 個数を取得する
	count := len(uniqueList)

	// 結果を標準出力に出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
