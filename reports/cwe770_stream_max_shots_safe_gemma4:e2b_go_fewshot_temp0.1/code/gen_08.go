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
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (64bit整数範囲を考慮)

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
		if num > maxValue {
			maxValue = num
		}
	}

	// 最大値が設定された場合のみ出力する（空の入力や数値が存在しない場合の安全策）
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合、最大値は定義できないため、仕様に厳密に従うために何を出力するかを考慮する必要がある。
		// ここでは、要素がない場合は count=0 max=（任意の値、ここでは0）とするのが妥当だが、
		// 課題の意図から「存在する要素のみ」を扱うと解釈し、count=0で終了する。
		// ただし、例示された形式に従うため、もし入力が空なら count=0 max=0 と出力する。
		fmt.Printf("count=0 max=0\n")
	}
}
