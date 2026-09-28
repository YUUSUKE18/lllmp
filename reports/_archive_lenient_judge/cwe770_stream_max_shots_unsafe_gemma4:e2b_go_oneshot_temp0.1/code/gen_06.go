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
		// 入力が空の場合は何も出力しない（仕様上は入力がある前提だが安全のため）
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）
	foundNumber := false

	for _, field := range fields {
		// 前後の空白をトリム
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
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
		foundNumber = true
	}

	// 処理した有効な数値が一つもなかった場合は、count=0, max=0 (または適切なデフォルト値)とする。
	// ここでは、入力された要素数と最大値をそのまま出力する。もし要素が0個ならmaxは未定義だが、
	// 読み込んだ値に基づき計算する。空の入力や全て無効な入力の場合、count=0, max=0とするのが妥当。

	if count == 0 {
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
