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

	// 正規表現で "値:回数" の形式を抽出するためのパターン
	// 例: 7:3,2:2 から '7:3' や '2:2' の部分を抽出する
	// 値は数字、コロン、数字の組み合わせを抽出する
	re := regexp.MustCompile(`(\d+):(\d+)`)

	totalCount := 0
	totalSum := int64(0)

	// 入力をカンマで分割して個々のペアを処理する
	parts := strings.Split(input, ",")

	for _, part := range parts {
		// 各部分から "値:回数" の形式を抽出する
		matches := re.FindStringSubmatch(part)
		if len(matches) != 3 {
			continue // 形式が一致しないものは無視
		}

		// 値と回数をパースする
		valueStr := matches[1]
		countStr := matches[2]

		value, errV := strconv.Atoi(valueStr)
		count, errC := strconv.Atoi(countStr)

		if errV != nil || errC != nil {
			continue // パースエラーがあれば無視
		}

		// 仕様に基づき、値が正しく、回数が0以上であることを確認（実際には入力形式から保証されるが念のため）
		if value >= 0 && count >= 0 {
			// 要素数に加算
			totalCount += count
			// 合計に加算 (値 * 回数)
			totalSum += int64(value) * int64(count)
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
