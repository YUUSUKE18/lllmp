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
		return // 入力がない場合は終了
	}
	inputLine := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(inputLine, ",")

	var count int
	var maxValue int64 = -1 // 最小値を初期値として設定。負の数も考慮するため、非常に小さな値から始める

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリムする
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

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if value > maxValue {
			maxValue = value
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
