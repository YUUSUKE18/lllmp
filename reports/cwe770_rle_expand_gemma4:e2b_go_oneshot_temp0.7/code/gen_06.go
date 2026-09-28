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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込むために ReadFile(0) を使用するか、bufio.Reader を使う
	if err != nil {
		// 標準入力からの読み込みが失敗した場合（通常は想定されないが念のため）
		return
	}
	inputStr := strings.TrimSpace(string(input))

	// 正規表現で "値:回数" の形式のペアを抽出する
	// 例: 7:3,2:2 から "7:3" と "2:2" を抽出する
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
