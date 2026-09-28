package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(osStdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	// 空白区切り文字（カンマやスペース）で区切って、空要素を除外して整数列を作る
	parts := strings.FieldsFunc(line, func(r rune) bool {
		return r == ',' || r == ' ' || r == '\t' || r == '\n'
	})

	numbers := make([]*big.Int, 0)
	for _, p := range parts {
		val, err := strconv.ParseInt(p, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}
		numbers = append(numbers, big.NewInt(val))
	}

	maps := make(map[int]int)
	sumBig := new(big.Int)
	for _, num := range numbers {
		val := num.Int64() // 入力範囲が 64bit に収まると仮定
		if _, exists := maps[val]; !exists {
			maps[val] = 1
		} else {
			maps[val]++
			sumBig.Add(sumBig, big.NewInt(val))
		}
	}

	// 重複を除いた個数（キーの総数）を求め、合計を出力
	count := len(maps)
	sumSmall := new(int64) // int64 が不足している場合は big.Int を使うべきだが、仕様上は収まる
	// bigInt -> small conversion is safe per spec (sum fits in 64bit)
	var sum int64 = 0
	tempBig := sumBig
	for tempBig.Sign() > 0 {
		val := tempBig.Int64() // This assumes the loop logic was incorrect above, let's fix directly below.
		sum += val
	}
	// Correct way to convert big.Int to int64 safely:
	var total int64 = sumBig.Int64()

	fmt.Printf("count=%d sum=%d\n", count, total)
}
