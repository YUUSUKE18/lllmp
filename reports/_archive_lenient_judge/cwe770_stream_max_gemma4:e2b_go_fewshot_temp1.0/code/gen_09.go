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
		maxValue := int64(-1e18) // 十分小さな値で初期化

		for _, part := range parts {
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
		}

		if count > 0 {
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		} else {
			// 全ての要素が無視された、または入力が空だった場合（問題の制約からここでは特に指定はないが、安全のため）
			// カウントが0の場合の出力形式を考慮する必要がある。
			// 厳密に「要素数と最大値」を出力するため、要素が存在しない場合は count=0 max=何らかの値 (例: -1 や 0) とする。
			// ここでは入力された有効な整数がない場合を想定し、count=0, max=-1などで出力する（最大値は64bitなので-1e18より大きい値で初期化する必要がある）。
			// しかし、問題文の指示に従い、読み取った要素のみに基づいて計算を行うため、countが0ならmaxも意味をなさない。
			// 多くの競プロでは、データが存在しない場合は特に指定がない限り何も出力しないか、仕様に従うことが多いが、ここでは0を出力する。
			fmt.Printf("count=0 max=%d\n", -1) // count=0で最大値は定義できないため、便宜的に-1などで表現する
		}
	}
}
