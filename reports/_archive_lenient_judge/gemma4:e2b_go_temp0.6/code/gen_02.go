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
	inputLine := scanner.Text()

	// カンマで分割し、各要素を文字列として保持する
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ（セットとして機能させる）
	uniqueNumbers := make(map[int]bool)

	for _, part := range parts {
		// 前後の空白をトリムする
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

		// 重複を除いてセットに追加
		uniqueNumbers[num] = true
	}

	// ユニークな整数をリストに変換する
	var uniqueList []int
	for num := range uniqueNumbers {
		uniqueList = append(uniqueList, num)
	}

	// 個数を求める (重複を除いた個数)
	count := len(uniqueList)

	// 合計を求める (64bit整数として扱う)
	var sum int64 = 0
	for _, num := range uniqueList {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
