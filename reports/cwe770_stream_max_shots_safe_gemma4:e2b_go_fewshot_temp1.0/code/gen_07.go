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
	if err != nil && err.Error() != "EOF" {
		// エラーが発生した場合（EOFを除く）は処理を終了
		return
	}

	// 入力行からカンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (実際には最大値を保持するために非常に大きな値が必要だが、ここでは入力があることを前提とする)

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

	// countとmaxValueを出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
