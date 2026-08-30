package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	input := scanner.Text()

	// 正規表現で "値:回数" の形式をマッチさせる
	// 値は整数、回数は整数
	re := regexp.MustCompile(`^(\d+):(\d+)$`)

	// カンマで分割して個々のペアを取得
	pairs := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		pair = strings.TrimSpace(pair)
		if pair == "" {
			continue
		}

		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // パースエラーの場合は無視
		}

		if count > 0 {
			// 要素数 (count) の加算
			totalCount += count
			// 合計 (値 * 回数) の加算
			totalSum += value * count
		}
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
