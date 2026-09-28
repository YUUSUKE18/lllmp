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
	line := scanner.Text()

	// 正規表現で "値:回数" の形式を抽出するためのパターン
	// 値は数字、コロン、回数は数字
	re := regexp.MustCompile(`(\d+):(\d+)`)
	matches := re.FindAllStringSubmatch(line, -1)

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
			// パースエラーは無視する（仕様上、正しくフォーマットされたもののみ処理）
			continue
		}

		// 要素数と合計の計算
		totalCount += count
		totalSum += value * count
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
