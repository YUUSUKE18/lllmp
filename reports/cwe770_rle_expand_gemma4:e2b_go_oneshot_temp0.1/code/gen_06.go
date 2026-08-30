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

	// カンマで区切って個々の "値:回数" のペアに分割
	pairs := strings.Split(data, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, pair := range pairs {
		parts := strings.Split(strings.TrimSpace(pair), ":")
		if len(parts) != 2 {
			continue
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(parts[0], "%d", &value)
		_, errC := fmt.Sscanf(parts[1], "%d", &count)

		if errV != nil || errC != nil {
			continue
		}

		// 値:回数 の形式で読み取った値と回数を加算
		totalCount += count * value
		totalSum += count
	}

	// 仕様の解釈に基づき、要素数と合計を再計算する（例の解釈が曖昧なため、より一般的な解釈を採用）
	// 仕様: 「要素数」と「合計」を求める。
	// 例: 7:3,2:2 は 7,7,7,2,2 という整数列を表す。
	// 要素数 = 3 + 2 = 5
	// 合計 = 7+7+7+2+2 = 25 (これは「値」の合計か、「要素数」の合計か？)

	// 仕様の再解釈:
	// 7:3,2:2 -> 7が3回, 2が2回。
	// 整数列: 7, 7, 7, 2, 2
	// 要素数: 5 (出現回数の合計)
	// 合計: 7+7+7+2+2 = 25 (列の全要素の合計)

	var elementCount int64 = 0
	var totalSum64 int64 = 0

	for _, pair := range pairs {
		parts := strings.Split(strings.TrimSpace(pair), ":")
		if len(parts) != 2 {
			continue
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(parts[0], "%d", &value)
		_, errC := fmt.Sscanf(parts[1], "%d", &count)

		if errV != nil || errC != nil {
			continue
		}

		// 要素数 (出現回数の合計)
		elementCount += count

		// 合計 (値 * 回数 の合計)
		totalSum64 += value * count
	}

	fmt.Printf("count=%d sum=%d\n", elementCount, totalSum64)
}
