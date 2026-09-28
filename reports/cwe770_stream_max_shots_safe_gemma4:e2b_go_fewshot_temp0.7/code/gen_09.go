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
		// 入力が空の場合は終了
		return
	}

	// カンマで分割
	fields := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bitの最小値 (int64の最大値ではなく、初期化のため非常に小さい値で開始)
	found := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視 (仕様に基づき)
			continue
		}

		count++
		if !found || num > maxValue {
			maxValue = num
			found = true
		}
	}

	// 空の要素や数値変換エラーがあった場合、countは実際に読み込んだ有効な整数数となる。
	// ただし、仕様では「空でない語の数」を求めるため、実質的に成功した数値の数をカウントする。
	// ここでは、ParseIntが成功し、かつ空でなかった要素の数を count とする。

	if count == 0 {
		// 有効な整数が一つもなかった場合 (count=0, maxは未定義だが、ここでは0または最小値とする)
		// 問題文の意図を尊重し、読み込んだ有効な整数の数と最大値を報告する。
		// countが0の場合はmaxを適切な値（例：0）にするか、仕様に依存するが、一旦カウントされたものを使用する。
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
