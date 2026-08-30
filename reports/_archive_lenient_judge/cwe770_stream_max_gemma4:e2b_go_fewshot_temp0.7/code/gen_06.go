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
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 max=-1") // 0個の要素、最大値は定義しないため-1などを設定（問題文に具体的な指示がないため一般的な処理を想定）
		return
	}

	line := sc.Text()
	parts := strings.Split(line, ",")

	count := 0
	max := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化

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
		if n > max {
			max = n
		}
	}

	// 要素数と最大値を指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
