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

	// 正規表現で "値:回数" の形式を抽出する
	// 例: 7:3,2:2 から "7:3" と "2:2" を抽出する
	re := regexp.MustCompile(`(\d+):(\d+)`)
	matches := re.FindAllStringSubmatch(input, -1)

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, match := range matches {
		if len(match) != 3 {
			continue
		}
		valueStr := match[1]
		countStr := match[2]

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			// パースエラーは無視する（仕様上、値と回数は整数であると想定される）
			continue
		}

		// 要素数 (値 * 回数)
		elementCount := value * count
		totalCount += elementCount

		// 合計 (値 * 回数)
		elementSum := value * count
		totalSum += elementSum
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
