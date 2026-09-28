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
	var values []int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		// 正規表現で "値:回数" のパターンを検索
		// 値は整数、コロン、回数は整数
		re := regexp.MustCompile(`^(\d+):(\d+)$`)
		parts := strings.Split(line, ",")

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			// 各部分を ':' で分割
			kv := strings.Split(trimmedPart, ":")
			if len(kv) != 2 {
				continue // 形式が不正なら無視
			}

			valueStr := strings.TrimSpace(kv[0])
			countStr := strings.TrimSpace(kv[1])

			value, errV := strconv.ParseInt(valueStr, 10, 64)
			count, errC := strconv.ParseInt(countStr, 10, 64)

			if errV == nil && errC == nil {
				if count >= 0 {
					// 値を count 回繰り返す
					for i := int64(0); i < count; i++ {
						values = append(values, value)
					}
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（今回の仕様では必須ではないが安全のため）
	}

	// 要素数と合計を計算
	var totalSum int64
	for _, v := range values {
		totalSum += v
	}
	elementCount := int64(len(values))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", elementCount, totalSum)
}
