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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力がなければ終了
	}
	inputLine := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(strings.TrimSpace(inputLine), ",")

	var count int
	var maxValue int64 = -1 // 最小値を想定し、初期値を非常に小さい値に設定 (ここでは最大値を求めるため)

	// 有効な整数をフィルタリングし、カウントと最大値を計算する
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として解析を試みる
		value, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// カウントを更新
		count++

		// 最大値を更新
		if value > maxValue {
			maxValue = value
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
