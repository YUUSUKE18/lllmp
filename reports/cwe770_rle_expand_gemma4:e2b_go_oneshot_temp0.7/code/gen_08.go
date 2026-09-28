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
	data := string(input)

	// 正規表現で "値:回数" のパターンにマッチする部分を抽出する
	// パターン: (\d+):(\d+)
	re := regexp.MustCompile(`(\d+):(\d+)`)
	matches := re.FindAllStringSubmatch(data, -1)

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, match := range matches {
		if len(match) != 3 {
			continue
		}
		// 値 (Value) は group 1, 回数 (Count) は group 2
		valueStr := match[1]
		countStr := match[2]

		value, err1 := strconv.ParseInt(valueStr, 10, 64)
		count, err2 := strconv.ParseInt(countStr, 10, 64)

		if err1 != nil || err2 != nil || count < 0 {
			// パースエラーや回数が負の場合は無視
			continue
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
