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

	// 形式: 値:回数,値:回数,...
	// 各要素を解析する
	var totalCount int64 = 0
	var totalSum int64 = 0

	// カンマで分割して個々のペアを処理
	pairs := strings.Split(data, ",")

	for _, pair := range pairs {
		pair = strings.TrimSpace(pair)
		if pair == "" {
			continue
		}

		// ':' で分割して値と回数を取得
		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		// 値と回数が整数として解析できるか確認
		value, errV := fmt.Sscanf(valueStr, "%d")
		count, errC := fmt.Sscanf(countStr, "%d")

		if errV != nil || errC != nil {
			continue // 整数に変換できない場合は無視
		}

		var valueInt, countInt int
		fmt.Sscanf(valueStr, "%d", &valueInt)
		fmt.Sscanf(countStr, "%d", &countInt)

		if countInt > 0 {
			// 要素数に加算
			totalCount += int64(valueInt * countInt)
			// 合計に加算
			totalSum += int64(valueInt) * int64(countInt)
		}
	}

	// 仕様の解釈に基づき、「要素数」と「合計」を求める。
	// 例: 7:3,2:2 は 7,7,7,2,2 (合計5要素)
	// これは「値:回数」のペアがそれぞれ出現する回数で要素数を数える、という解釈に基づき再計算する。

	finalCount := int64(0)
	finalSum := int64(0)

	// 再度解析し、要素数と合計を求める
	// 7:3,2:2 -> 7が3回, 2が2回出現。
	// 要素数 = 3 + 2 = 5
	// 合計 = 7*3 + 2*2 = 21 + 4 = 25
	
	// この問題文の意図を明確にするため、元の例に従い「7:3,2:2 は 7,7,7,2,2 という整数列を表す」という定義を重視する。
	
	// 1. 全ての出現回数を合計する
	for _, pair := range pairs {
		pair = strings.TrimSpace(pair)
		if pair == "" {
			continue
		}

		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			continue
		}

		var value, count int
		fmt.Sscanf(parts[0], "%d", &value)
		fmt.Sscanf(parts[1], "%d", &count)

		// value が count 回繰り返される
		if count > 0 {
			finalCount += int64(count)
			finalSum += int64(value) * int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", finalCount, finalSum)
}
