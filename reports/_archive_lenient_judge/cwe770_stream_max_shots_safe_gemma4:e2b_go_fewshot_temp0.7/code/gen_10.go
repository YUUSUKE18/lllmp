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
	parts := strings.Split(data, ",")
	count := 0
	maxValue := int64(-1e18) // 64bit整数の範囲を考慮し、非常に小さな値で初期化（最小値として扱う）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視する (仕様に基づき)
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 空要素や不正な要素がなかった場合、countは0になる可能性があるため、
	// 読み込んだ有効な要素の数に基づいて出力する。
	if count == 0 {
		// 要素が一つもなかった場合は、カウント0と最大値の適切な初期値を出力する。
		// 最大値については、問題の制約がないため、ここでは0または特別な値とするが、
		// 読み込んだ要素が存在しない場合の振る舞いを考慮し、
		// 実際には空の入力に対しては count=0, max=0 とするのが自然かもしれない。
		// ただし、最大値を初期化時に-1e18としたため、count=0の場合はmaxも不適切になる可能性がある。
		// 入力に整数が一つもなかった場合は、count=0, max=0と解釈する。
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
