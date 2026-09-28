package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは標準入力から直接読み取る方が一般的だが、今回は文字列として扱う）
	if err != nil {
		// エラー処理は省略するが、通常はここでエラーを報告する
		return
	}

	data := string(input)
	// カンマで分割し、空白を除去した後の整数列を取得
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値（初期化）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 厳密に count=<個数> max=<最大値> の1行を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
