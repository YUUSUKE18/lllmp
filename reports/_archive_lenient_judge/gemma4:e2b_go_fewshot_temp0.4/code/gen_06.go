package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if sc.Scan() {
		line := sc.Text()
		// カンマで分割
		parts := strings.Split(line, ",")

		// 重複を除いた整数を格納するためのマップ
		seen := make(map[int64]bool)
		var count int
		var sum int64

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			// 整数として解析を試みる
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			// 重複チェックと集計
			if !seen[n] {
				seen[n] = true
				count++
				sum += n
			}
		}

		// 結果を出力
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
