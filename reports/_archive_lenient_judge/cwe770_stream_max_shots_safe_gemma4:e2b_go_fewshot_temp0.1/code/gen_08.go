package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (64bit整数範囲を考慮)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 空の要素や数値変換エラーがあった場合、countが0になる可能性があるため、
	// countとmaxValueを正しく出力する。
	if count == 0 {
		// 要素が一つも有効でなかった場合、最大値は定義できない（ここでは0または適切なデフォルト値を設定する必要があるが、
		// 問題の制約から入力があればcount>=1になるはず。もし空入力なら0, -1など）
		// ここでは、要素が存在しない場合は count=0, max=0 とするのが安全かもしれないが、
		// 読み込んだデータに基づいて計算した結果を出力する。
		// もし入力が完全に無効な場合、count=0, maxValue=-1e18 のまま出力されることになる。
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
