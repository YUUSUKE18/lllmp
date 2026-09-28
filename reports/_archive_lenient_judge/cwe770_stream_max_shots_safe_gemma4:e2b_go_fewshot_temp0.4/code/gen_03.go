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
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bitの最小値 (int64の最大値に近い値で初期化)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if !found || num > maxValue {
			maxValue = num
			found = true
		}
	}

	if count == 0 {
		// 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは0を出力する（または仕様に従う）
		// 空の入力の場合、count=0, max=0とするのが妥当か。
		// ここでは要素が存在しない場合は count=0, max=0 とする。
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
