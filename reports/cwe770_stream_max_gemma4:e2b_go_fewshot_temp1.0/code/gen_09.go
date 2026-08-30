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
		fields := strings.Split(line, ",")
		count := 0
		maxValue := int64(-2147483648) // 64bit intの最小値 (ここでは安全のために非常に小さい値で初期化。実際には最初の有効な値で上書きする)
		foundFirst := false

		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if !foundFirst || n > maxValue {
				maxValue = n
				foundFirst = true
			}
		}

		if count > 0 {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else {
			// カンマ区切りの要素がすべて無視された場合（入力が空または無効な値のみの場合）
			fmt.Printf("count=0 max=0\n") // 要素がない場合は 0 を出力するのが適切
		}
	}
}
