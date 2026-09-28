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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		// 入力エラーが発生した場合（通常は発生しないが念のため）
		return
	}

	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は count=0 max=0 を出力
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して要素のリストを得る
	parts := strings.Split(inputStr, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の最小値より小さい値で初期化
	found := false

	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)

		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 有効な整数が見つかった場合
		count++
		if val > maxValue {
			maxValue = val
		}
		found = true
	}

	// 結果を出力する
	// countが0の場合、maxValueは初期値のまま（-1）になる可能性があるが、
	// 0個の要素に対して最大値を求めるのは無意味であるため、
	// countが0の場合はmaxを0として扱う（または、入力が空の場合は既に処理済み）
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
