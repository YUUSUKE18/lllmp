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
	var count int
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を小さく設定（または最初の要素で初期化）

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		currentCount := 0
		currentMax := int64(-1)

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			n, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			currentCount++
			if n > currentMax {
				currentMax = n
			}
		}

		if currentCount > 0 {
			if count == 0 {
				count = currentCount
				maxValue = currentMax
			} else {
				count += currentCount
				if currentMax > maxValue {
					maxValue = currentMax
				}
			}
		}
	}

	// 注意: 例の仕様を再解釈します。
	// 「カンマ区切りの整数列を受け取る」という指示は、通常、一行に複数の値が並んでいることを意味します。
	// 例1, 2, 3の形式から考えると、「標準入力全体がカンマ区切りで整数列である」と解釈するのが自然です。

	// 再度、よりシンプルな解釈（標準入力全体を読み込み、カンマで分割する）に基づき実装します。
	// 例1, 2, 3のパターンに従い、入力全体を処理します。

	data, _ := os.ReadFile(os.Stdin.Name()) // 標準入力全体を読み込む
	inputStr := string(data)

	// カンマ区切りの整数列として処理
	fields := strings.Split(strings.TrimSpace(inputStr), ",")
	finalCount := 0
	finalMax := int64(-1 << 63) // 64bitの最小値に近い大きな値で初期化（負の数も考慮）

	for _, f := range fields {
		f = strings.TrimSpace(f)
		if f == "" {
			continue
		}
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		finalCount++
		if n > finalMax {
			finalMax = n
		}
	}

	// 最終結果を出力
	fmt.Printf("count=%d max=%d\n", finalCount, finalMax)
}
