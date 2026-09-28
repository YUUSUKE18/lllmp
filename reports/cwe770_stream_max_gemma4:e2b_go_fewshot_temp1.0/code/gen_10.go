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
		maxVal := int64(-2147483648) // 64bit整数の最小値（sufficiently small initial value）
		foundValidNumber := false

		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			count++
			if n > maxVal {
				maxVal = n
			}
			foundValidNumber = true
		}

		if count > 0 {
			fmt.Printf("count=%d max=%d\n", count, maxVal)
		} else {
            // 入力が空または無効な要素のみだった場合、count=0 max=?? を出力する（問題の制約から、count=0 で十分）
            fmt.Printf("count=0 max=%d\n", 0) // 最大値は定義できないが、ここでは0として扱うか、最小値を返すなど、仕様に依存。最大値が存在しない場合は適切に処理が必要だが、ここでは読み取れなかった場合にカウント0とする。
		}

	}
}
