package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // 0は標準入力
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=-1") // 入力が空の場合の処理（最大値が定義できないため）
		return
	}

	// カンマで分割して整数列を取得する
	parts := strings.Split(data, ",")

	var count int
	var maxValue int64 = -1 << 63 // 64bit整数の最小値に近い大きな初期値（負の無限大に相当）
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
		}
		found = true
	}

	// 要素が存在したかどうかを考慮して出力
	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数として有効な要素が一つもなかった場合（例：入力がカンマのみなど）
		// 仕様上は「要素数」と「最大値」を求めるとあるため、0個で最大値を未定義とするか、
		// 読み込んだ要素数をそのまま出力する。ここでは読み込んだ有効な要素数を出力する。
		fmt.Printf("count=%d max=-1\n", 0) // 要素が一つもなかった場合は count=0, max=-1 とする（一般的な最大値の扱いとして）
	}
}
