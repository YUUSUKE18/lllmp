package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここでは標準的な方法で処理する
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して整数列を取得
	fields := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため、安全のため非常に大きな正の数で初期化するのが一般的だが、ここでは最大値を求めるため、最初の要素で初期化する方が安全)
	found := false

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

		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
