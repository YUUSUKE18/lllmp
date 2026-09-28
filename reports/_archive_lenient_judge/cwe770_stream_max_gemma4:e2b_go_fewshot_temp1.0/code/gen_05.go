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
		count := 0
		maxValue := int64(-1) // 64bit整数の範囲を考慮し、初期値を適切に設定（最小値より大きい値で初期化するのが安全だが、ここでは一旦-1として扱う。問題文では「整数列」なので、最初の有効な数で初期化する方が良いかもしれない）

		// 有効な数値のみを処理
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
			count++

			// 最大値を更新
			if n > maxValue {
				maxValue = n
			}
		}

		// countとmaxValueを出力
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
