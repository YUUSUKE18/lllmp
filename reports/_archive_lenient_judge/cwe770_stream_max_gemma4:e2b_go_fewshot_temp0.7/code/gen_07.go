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
		maxValue := int64(-1e18) // 64bit整数の範囲を考慮して非常に小さな値で初期化

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				continue // 整数として解釈できない要素は無視
			}

			count++
			if n > maxValue {
				maxValue = n
			}
		}

		// すべての要素が有効な整数であった場合のみ出力する（空要素や無効な要素を数に含めないようにするため）
		if count > 0 {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else {
			// 要素が一つもなかった場合は、count=0, max=? となるが、ここでは「空要素・無視された要素」を考慮し、
			// 読み込んだ有効な整数の数と最大値を報告する。もし入力が完全に無効であれば、count=0で出力する。
			fmt.Printf("count=0 max=%d\n", 0) // countは有効な整数のみを数えるため、0個ならcount=0
		}
	}
}
