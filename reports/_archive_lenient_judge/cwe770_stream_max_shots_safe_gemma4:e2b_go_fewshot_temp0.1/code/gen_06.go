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

	// 空の要素や数値変換エラーを無視した後のカウントと最大値を計算する。
	// 仕様では「空でない語の数」と「最大値」を求めるため、上記ループで集計したものを利用する。
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合（全て空または無効な入力）
		fmt.Printf("count=0 max=-1\n") // 最大値の定義に合わせるため、ここでは-1などを出力するが、問題文の制約から実質的には count=0 で十分かもしれない。
	}
}
