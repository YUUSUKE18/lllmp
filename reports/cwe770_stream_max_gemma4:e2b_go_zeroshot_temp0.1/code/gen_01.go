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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力がない場合は終了
	}
	line := scanner.Text()

	// カンマで分割して文字列のスライスを得る
	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 最小値を初期値として非常に小さい値に設定（64bit整数範囲内）

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリムする
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視
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
