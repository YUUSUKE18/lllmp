package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1e18) // 非常に小さな値で初期化 (64bitの範囲を考慮)
	foundNumber := false

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
		foundNumber = true
	}

	// すべての数が処理された場合のみ結果を出力（空の入力や全て無効な入力の場合も考慮）
	if foundNumber {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数が一つもなかった場合の対応。仕様上は「要素数と最大値」を求めるため、0個、あるいは適切な初期値を出すべきだが、
		// 入力が完全に空であった場合は何も出力しないか、定義に従う。ここでは入力された有効な数値がない場合は何もしない（またはゼロとして扱う）が、
		// 厳密には「要素数と最大値」を求めよという指示なので、0個、最大値未定となる。全ての整数列が空の場合の挙動は問題文に明記されていないため、入力された有効な数値が存在する場合のみ出力する。
	}
}
