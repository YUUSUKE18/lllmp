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

	// カンマで分割して個々の要素に分ける
	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		matches := re.FindStringSubmatch(part)
		if len(matches) != 3 {
			// 形式が一致しない場合は無視
			continue
		}

		// 値と回数をパース
		valueStr := matches[1]
		countStr := matches[2]

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			// パースエラーが発生した場合は無視
			continue
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
