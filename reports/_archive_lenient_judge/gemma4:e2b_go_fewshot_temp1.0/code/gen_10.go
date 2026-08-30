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
		parts := strings.Split(line, ",")
		
		// 重複を除いた整数を格納するためのマップと合計値
		uniqueNumbers := make(map[int64]bool)
		var sum int64 = 0

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			if !uniqueNumbers[n] {
				uniqueNumbers[n] = true
				sum += n
			}
		}

		count := len(uniqueNumbers)
		
		// 厳密に count=<個数> sum=<合計> の1行を出力
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
