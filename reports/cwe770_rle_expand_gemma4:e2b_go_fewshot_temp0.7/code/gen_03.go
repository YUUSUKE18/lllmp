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
	// 標準入力全体を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーが発生した場合は終了
		return
	}
	data := string(input)

	// 正規表現で "値:回数" の形式を抽出する
	// \d+:\d+ のパターンにマッチさせ、値と回数をキャプチャする
	re := regexp.MustCompile(`(\d+):(\d+)`)
	matches := re.FindAllStringSubmatch(data, -1)

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, match := range matches {
		// match[1] は値 (value), match[2] は回数 (count)
		valueStr := match[1]
		countStr := match[2]

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		// パースに失敗した場合はスキップ（仕様により、形式に合わないものは無視）
		if errV != nil || errC != nil {
			continue
		}

		// 要素数と合計を計算
		totalCount += count
		totalSum += value * count
	}

	// 厳密に count=<要素数> sum=<合計> の1行を出力する
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
