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

	// カンマで分割して文字列の配列にする
	parts := strings.Split(inputLine, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 最小値を初期値として、正の数やゼロを含む場合に備えるため、非常に小さな値で初期化する

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)

		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できないものは無視
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
