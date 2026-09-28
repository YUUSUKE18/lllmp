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

	// 正規表現で "値:回数" の形式のペアを抽出する
	// (\d+):(\d+) の形式で、値と回数をキャプチャする
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
			continue
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
