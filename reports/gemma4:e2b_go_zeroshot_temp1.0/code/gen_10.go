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

	line := scanner.Text()
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ（セットとして機能させるため）
	uniqueNumbers := make(map[int]bool)
	for _, part := range parts {
		// 空の文字列や前後の空白を無視
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除外
		uniqueNumbers[num] = true
	}

	// 重複を除いた整数をリストに変換
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める（重複を除いた個数）
	count := len(uniqueList)

	// 合計を求める (64bit整数として扱うため int64 を使用)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
