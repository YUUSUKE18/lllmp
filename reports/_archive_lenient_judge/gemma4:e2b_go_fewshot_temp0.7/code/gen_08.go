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

		// 重複を除いた整数を格納するためのマップと合計用の変数
		seen := make(map[int]bool)
		var count int
		var sum int64

		for _, part := range parts {
			// 前後の空白をトリム
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			// 整数として解析を試みる
			n, err := strconv.Atoi(trimmedPart)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			// 重複チェックと集計
			if !seen[n] {
				seen[n] = true
				count++
				sum += int64(n)
			}
		}

		// 指定された形式で出力
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
