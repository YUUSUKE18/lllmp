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
	parts := strings.Split(strings.TrimSpace(input), " ")

	var totalCount int64 = 0
	var totalSum int64 = 0

	// 正規表現で "値:回数" の形式をチェックする
	// 値は数字、コロン、回数は数字の後に続く
	re := regexp.MustCompile(`^(\d+):(\d+)$`)

	// カンマで区切られた各ペアを処理
	pairs := strings.Split(input, ",")

	for _, pair := range pairs {
		trimmedPair := strings.TrimSpace(pair)
		if trimmedPair == "" {
			continue
		}

		// 値と回数をコロンで分割
		kv := strings.Split(trimmedPair, ":")
		if len(kv) != 2 {
			continue // 形式が不正なら無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			continue // パースエラーなら無視
		}

		if count > 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
