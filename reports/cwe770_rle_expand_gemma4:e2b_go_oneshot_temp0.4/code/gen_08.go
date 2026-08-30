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
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// 正規表現で "値:回数" の形式のペアを抽出
	// 例: 7:3,2:2 から "7:3" と "2:2" を抽出
	re := regexp.MustCompile(`(\d+):(\d+)`)
	matches := re.FindAllStringSubmatch(data, -1)

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, match := range matches {
		if len(match) != 3 {
			continue
		}
		valueStr := match[1]
		countStr := match[2]

		value, err1 := strconv.ParseInt(valueStr, 10, 64)
		count, err2 := strconv.ParseInt(countStr, 10, 64)

		if err1 != nil || err2 != nil {
			continue
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
