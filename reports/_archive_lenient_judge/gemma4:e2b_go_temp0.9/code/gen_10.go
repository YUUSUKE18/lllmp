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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	inputLine := scanner.Text()

	// カンマで分割し、空白を無視して整数としてパースする
	parts := strings.Split(inputLine, ",")
	
	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除いた整数として記録
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換
	var uniqueList []int64
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める
	count := len(uniqueList)

	// 合計を求める (64bit整数の範囲に収まることを前提とする)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
