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
		
		// 重複を除いた整数を格納するためのマップと合計値を初期化
		uniqueNumbers := make(map[int64]struct{})
		var sum int64 = 0

		for _, part := range parts {
			// 前後の空白をトリム
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			// 整数に変換を試みる
			num, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			// 重複チェックと合計の計算
			if _, exists := uniqueNumbers[num]; !exists {
				uniqueNumbers[num] = struct{}{}
				sum += num
			}
		}

		count := len(uniqueNumbers)
		
		// 厳密に count=<個数> sum=<合計> の1行を出力
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
