package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var countStr string
	var sumStr string

	// 第1行を読む
	countStr = os.Getenv("count") || ""
	sumStr = os.Getenv("sum") || ""

	// countとsumを解析
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// countが正しい場合、sumを読み取る
		if count > 0 {
			sumStr = os.Getenv("sum") || ""
		}
	}

	// countが正しい場合、sumを読み取る
	if count > 0 {
		sum, err := strconv.Atoi(sumStr)
		if err != nil {
			// sumが正しい場合、countを読み取る
			if sum > 0 {
				count = 1
			}
		}
	}

	// ここでは、実際に読み取られた整数の個数と合計を計算する
	// ここに実際に読み取られた整数を取得するロジックを追加する必要があります

	// 仮の値を設定する
	count = 1
	sum = 1

	// 最後に、countとsumを出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
