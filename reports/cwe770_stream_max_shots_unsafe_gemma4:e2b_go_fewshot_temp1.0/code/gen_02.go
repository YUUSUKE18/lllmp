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
	count := 0
	max := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (min_int64を考慮して、実際にはfloat64やbig.Intを使うべきだが、ここでは一般的な整数として扱うため、十分大きな値とする)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		// カンマ区切りの文字列を処理
		fields := strings.Split(line, ",")
		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			// 整数としてパース
			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			// カウントと最大値を更新
			count++
			if n > max {
				max = n
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常、この課題では無視されることが多いが、堅牢性のため）
	}

	// 厳密に count=<個数> max=<最大値> の1行出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
