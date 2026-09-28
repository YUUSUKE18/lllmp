package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")

		count := 0
		maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値で初期化

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if n > maxValue {
				maxValue = n
			}
		}

		// 最初の要素が読み込まれなかった場合（空の入力など）、カウントを0にする
		if count == 0 {
			fmt.Printf("count=0 max=%d\n", 0) // 最大値は定義できないため、ここでは0とするか、問題の制約に従う。ここでは安全のため0を出力する。
			return
		}

		// 仕様に合わせて出力
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
