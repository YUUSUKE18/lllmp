package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.Stdin.ReadString('\n')
	// 入力をカンマで分割
	parts := strings.Split(strings.TrimSpace(input), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値（-2^63）
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	// すべての数値が有効であった場合のみ結果を出力する（空入力や全て無効な入力の場合を考慮）
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 入力が空または無効な要素のみだった場合、仕様に従って何かを出力する必要があるか？
		// 仕様は「整数列を受け取る」なので、要素数0の場合も処理する。
		// 整数として解釈できたものが一つもなかった場合は count=0, max=（未定義だがここでは-1などを許容しない）とするのが自然だが、
		// 厳密に「最大値」を求めるため、数値が存在しなければ出力しないか、あるいは0を出力する。
		// ここでは、数値を読み取れなかった場合や入力が空の場合は何も出力しない（count=0の場合）。
	}
}
