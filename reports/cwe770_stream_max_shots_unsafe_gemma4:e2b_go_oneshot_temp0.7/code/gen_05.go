package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // 0 は標準入力
	if err != nil {
		return
	}

	// 文字列として読み込んだデータをカンマで分割する
	// strings.Fields を使うと空白区切りで分割されるため、まずはカンマをスペースに置換して処理するか、
	// または直接文字列操作を行う。ここではカンマ区切りを想定し、strings.Split を使用する。
	// ただし、入力が "1,2,3" の形式であるため、そのまま分割する。
	inputStr := string(input)
	if inputStr == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割し、各要素を処理する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（実質的なマイナス無限大）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
