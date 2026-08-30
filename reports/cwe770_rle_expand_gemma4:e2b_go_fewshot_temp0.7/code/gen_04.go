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

	var count int64 = 0
	var sum int64 = 0

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
			continue // フォーマットが不正な場合は無視
		}

		valueStr := strings.TrimSpace(kv[0])
		countStr := strings.TrimSpace(kv[1])

		// 値と回数が整数として有効か確認
		var value int64
		var count int64
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV == nil && errC == nil && count >= 0 {
			// 値:回数 の形式で解釈できた場合、要素数と合計を計算
			// 要素数 = 値 * 回数
			// 合計 = 値 * 回数
			// 問題の指示に基づくと、これは「値」が「要素」であり、「回数」がその「出現回数」を意味する。
			// 例: 7:3 は 7 が 3 回出現することを意味する (7, 7, 7)
			// 要素数 = 回数 (この解釈が最も自然だが、例の生成方法を考慮する)

			// 仕様の解釈: "7:3,2:2 は 7,7,7,2,2 という整数列を表します。"
			// これは、値が要素、回数がその要素の出現回数を示している。
			// 7:3 => 値=7, 回数=3 (7が3回出現)
			// 2:2 => 値=2, 回数=2 (2が2回出現)
			// 要素数 = 回数 (出現した要素の総数)
			// 合計 = 値 * 回数 (要素の総和)

			count += count
			sum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
