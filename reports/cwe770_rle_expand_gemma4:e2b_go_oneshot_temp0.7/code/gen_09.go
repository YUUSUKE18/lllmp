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
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	inputStr := string(input)

	// 正規表現で "値:回数" のパターンにマッチするすべての部分を抽出する
	// パターン: (\d+):(\d+)
	re := regexp.MustCompile(`(\d+):(\d+)`)
	matches := re.FindAllStringSubmatch(inputStr, -1)

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
