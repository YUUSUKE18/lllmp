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

	// 正規表現を使用して "値:回数" のパターンを抽出
	// (\d+):値, (\d+):回数 の形式を抽出したいが、今回はカンマ区切りで入力が与えられるため、
	// まずカンマで分割し、各部分を解析する方が確実。

	parts := strings.Split(input, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割して、値と回数を取得
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			// "値:回数" 形式でない場合は無視
			continue
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, err := strconv.ParseInt(valueStr, 10, 64)
		if err != nil {
			// 値が整数に変換できない場合は無視
			continue
		}

		count, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil {
			// 回数が整数に変換できない場合は無視
			continue
		}

		if count > 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
