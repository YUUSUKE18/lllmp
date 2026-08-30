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

	// カンマで分割し、各要素を整数として処理する
	parts := strings.Split(inputLine, ",")
	
	// 重複を除いた整数を格納するためのマップを使用する (重複排除のため)
	uniqueNumbers := make(map[int]bool)
	var totalSum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数として解釈可能かチェックし、変換する
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}

		// 重複をチェックし、ユニークな数のみ処理する
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			totalSum += int64(num)
		}
	}

	// 個数を取得する (マップの要素数)
	count := len(uniqueNumbers)

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
