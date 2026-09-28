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
			// 整数として解釈できない要素は無視
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

	// すべての要素が有効な整数であった場合のみ、結果を出力する（空の入力や全て無効な入力の場合を考慮）
	if foundNumber {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数が見つからなかった場合は、0個と最大値（ここでは未定義だが、実質的に何もデータがないため0とするか、仕様に厳密に従う）
		// 空の入力や無効な入力のみの場合、count=0 max=0 または count=0 max=-1 などが考えられるが、
		// 読み込んだ要素数と最大値を報告する。ここでは有効な整数が見つからなかった場合は0個と適切な値を出力する。
		fmt.Printf("count=0 max=%d\n", 0) // 厳密には「要素数」と「最大値」を求めるため、データがなければ0, 0とするのが妥当かもしれないが、ここでは読み込んだ有効な要素に基づいて計算した結果を出力する。
	}
}
