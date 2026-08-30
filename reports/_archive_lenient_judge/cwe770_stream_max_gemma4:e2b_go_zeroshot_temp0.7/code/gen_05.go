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
		return
	}
	line := scanner.Text()

	// カンマで分割
	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 最小値を初期値として非常に小さい値に設定（または最初の要素で上書き）

	isValid := false

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパース
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数と最大値を更新
		if !isValid {
			count = int(val)
			maxValue = val
			isValid = true
		} else {
			// 要素数を保持し、最大値を更新
			if val > maxValue {
				maxValue = val
			}
		}
	}

	// すべての要素が有効な整数であった場合のみ出力する（仕様上は入力されたものから計算するため、少なくとも1つあればOKとする）
	if isValid {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
