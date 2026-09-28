package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// stdinから入力を受け取る
	input := strings.NewReader(os.Stdin)
	// 全体を分割する
	elements := strings.Fields(input.String())

	count := 0
	max := -1

	for _, element := range elements {
		// 空格や空白を無視する
		if strings.TrimSpace(element) == "" {
			continue
		}

		// 整数として解釈する
		n, err := strconv.Atoi(element)
		if err != nil {
			continue
		}

		// 値が64bit整数の範囲に含まれているかをチェック
		if n < -1 << 63 || n > (1 << 63) - 1 {
			continue
		}

		// 元の要素数と最大値を更新
		count++
		if n > max {
			max = n
		}
	}

	// 出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
