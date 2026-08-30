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
		// 入力が空の場合は何も出力しない（仕様上、入力があることを前提とするが念のため）
		return
	}

	line := scanner.Text()
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値（負の無限大相当）
	foundValidNumber := false

	for _, part := range parts {
		// 前後の空白をトリムして空文字でないことを確認
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
		foundValidNumber = true
	}

	// 要素が一つも有効な整数でなかった場合、countは0、maxは定義されない（あるいはデフォルト値）となる。
	// 課題の意図に従い、読み込んだ要素数と最大値をそのまま出力する。
	if count == 0 {
		// 入力が空またはすべて無効な場合、count=0, max=ここでは未定義だが、0を出力するのが妥当かもしれない。
		// ただし、入力がカンマ区切りで存在したことを前提とするため、読み込んだ有効な要素数と最大値を報告する。
		// 全て無視された場合は count=0, maxValueの初期値が残る。ここでは最低限の情報を出力する。
		fmt.Printf("count=%d max=%d\n", 0, 0) // または適切なデフォルト値
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
