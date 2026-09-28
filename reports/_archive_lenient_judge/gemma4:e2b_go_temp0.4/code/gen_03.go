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
		return // 入力が空の場合は終了
	}
	line := scanner.Text()

	// カンマで分割し、各要素を処理する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用
	uniqueNumbers := make(map[int]bool)

	for _, part := range parts {
		// 前後の空白を削除
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

		// 重複を除いて格納
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を計算
	count := len(uniqueList)

	// 合計を計算 (64bit整数の範囲に収まることを前提とする)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
