package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何も出力しない（仕様上は入力がある前提だが安全のため）
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため、非常に大きな正の数で初期化する方が安全だが、ここでは最初の有効な値で初期化する戦略をとる)
	foundFirst := false

	for _, field := range fields {
		// 前後の空白をトリム
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

		if !foundFirst || n > maxValue {
			maxValue = n
			foundFirst = true
		}
	}

	// すべての要素が有効な整数であった場合のみ、結果を出力する（空の入力や全て無効な入力の場合を考慮）
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
