package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白を無視して整数を抽出する
	parts := strings.Split(strings.TrimSpace(data), ",")
	count := 0
	maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値で初期化

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

	if count == 0 {
		// 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは仕様に従い何かを出力する。
		// 整数列が空ならcount=0, maxは未定義だが、ここでは安全のため0とするか、適切なエラー処理を行うべき。
		// 例として、入力がない場合は count=0, max=0 とする（または最大値の範囲外の値）。
		// 問題文の制約から、少なくとも1つの整数が読み込まれたと仮定する。
		// もし空の入力に対しては何も出力しないのが適切なら、以下のように処理を続ける。
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
