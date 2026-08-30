package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで区切って各要素を処理
	parts := strings.Split(data, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数としてパース可能か確認
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue // パースエラーがあれば無視
		}

		// 値が正しくパースされたか確認（Sscanfは成功しても値が期待通りでない場合があるため、ここでは単純に整数として扱う）
		var val int
		var cnt int
		_, errV = fmt.Sscanf(valueStr, "%d", &val)
		_, errC = fmt.Sscanf(countStr, "%d", &cnt)

		if errV == nil && errC == nil {
			// 値:回数 の形式で、値が整数、回数が整数であると仮定して処理を進める
			// 課題の例では「値:回数」が与えられているため、値が「値」、回数が「回数」となる。
			// 7:3 は 値=7, 回数=3
			// 7,7,7,2,2 という整数列を表すため、値が7で3回、値が2で2回、という解釈が自然。
			// しかし、例の解釈は「7:3,2:2」は 7,7,7,2,2 という整数列を表す、とある。
			// これは「値:回数」のペアが、その「値」を「回数」だけ繰り返すことを意味する。

			// 課題の解釈に基づき、値が「値」、回数が「回数」となる。
			// 7:3 -> 値=7, 回数=3。7を3回加算する。
			// 2:2 -> 値=2, 回数=2。2を2回加算する。

			for i := 0; i < cnt; i++ {
				totalSum += int64(val)
				totalCount++
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
