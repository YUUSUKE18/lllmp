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

	// 入力をカンマで分割
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		matches := re.FindStringSubmatch(part)
		if len(matches) == 3 {
			// matches[1] は値 (Value), matches[2] は回数 (Count)
			valueStr := matches[1]
			countStr := matches[2]

			value, errV := strconv.ParseInt(valueStr, 10, 64)
			count, errC := strconv.ParseInt(countStr, 10, 64)

			if errV != nil || errC != nil {
				// パースエラーは無視する（仕様上、形式が正しくないものは無視）
				continue
			}

			// 要素数と合計を計算
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
