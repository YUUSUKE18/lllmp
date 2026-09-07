package main

import (
	"fmt"
	"math"
)

func main() {
	const target = 64 // 目標値
	var pairs int

	// 標準入力から整数を読み取る
	for {
		line, err := fmt.Scanln()
		if err != nil {
			break
		}

		// 整数を解析
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 目標値との差を計算
		diff := target - num

		// 差が 0 でなければ、ペアをカウントアップ
		if diff != 0 {
			pairs++
		}
	}

	// 結果を出力
	fmt.Println(fmt.Sprintf("pairs=%d", pairs))
}
