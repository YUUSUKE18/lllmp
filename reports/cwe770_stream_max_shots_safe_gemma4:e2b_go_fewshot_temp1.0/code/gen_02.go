package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		// 入力が空の場合、何も出力しない（または仕様に依存するが、ここでは続行）
		return
	}

	// カンマで分割し、前後の空白を除去して整数を抽出
	fields := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値 (int64の範囲で十分な初期値)
	foundValidNumber := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
		foundValidNumber = true
	}

	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 有効な整数が一つもなかった場合（例えば入力が全て空白やカンマのみの場合）
		fmt.Printf("count=0 max=%d\n", 0) // 最大値は定義できないため、便宜上0または最小値を設定する。ここではカウント0として扱う。
	}
}
