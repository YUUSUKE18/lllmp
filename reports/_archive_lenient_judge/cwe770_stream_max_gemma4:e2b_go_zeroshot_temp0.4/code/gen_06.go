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
	line := scanner.Text()

	// カンマで分割して整数を抽出する
	parts := strings.Split(line, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 最小値として非常に小さい値を初期化（問題の制約から、入力が空でない限り更新される）

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
