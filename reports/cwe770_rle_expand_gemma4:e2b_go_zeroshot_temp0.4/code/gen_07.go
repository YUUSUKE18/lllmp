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
	// 値は数字、コロン、回数は数字
	re := regexp.MustCompile(`^(\d+):(\d+)$`)

	// 入力文字列をカンマで分割
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

			if errV == nil && errC == nil {
				// 要素数に加算
				totalCount += count
				// 合計に加算 (値 * 回数)
				totalSum += value * count
			}
		}
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
