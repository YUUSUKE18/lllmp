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
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
		}
	}

	if count == 0 {
		// 要素が一つもなかった場合、最大値の出力方法を定義する必要があるが、
		// 仕様に従い、要素数と最大値をそのまま出力する。
		// このケースでは、count=0, max=適切な初期値（ここでは-1など）となる。
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
