package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // 標準入力へリダイレクト
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	// 空要素・前後の空白を無視し、整数として解釈可能な要素のみ抽出
	var integers []int64
	for _, s := range input {
		if s == ',' || s == ' ' || s == '\t' || s == '\n' {
			continue
		}
		val, err := strconv.ParseInt(string(rune(s)), 10, 64)
		if err != nil {
			continue
		}
		integers = append(integers, val)
	}

	// 重複を除く
	var uniqueInts []int64
	seen := make(map[int64]bool)
	for _, v := range integers {
		if !seen[v] {
			seen[v] = true
			uniqueInts = append(uniqueInts, v)
		}
	}

	// 個数と合計を計算
	count := len(uniqueInts)
	sumBig := big.NewInt(0)
	for _, v := range uniqueInts {
		sumBig.Add(sumBig, big.NewInt(v))
	}

	fmt.Printf("count=%d sum=%s\n", count, sumBig.String())
}
