package main

import (
	"fmt"
	"strconv"
)

// memo は n が対応する手数を保存する
var memo = make(map[int]int)

func compute(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}

	var result int
	// n は変数
	result = 1 + compute(n/2) // 2つ分の手数

	if n%2 == 0 {
		result += compute(n/2)
	} else {
		// 3n+1 に置き換える
		result += compute(3*n + 1)
	}

	// 1 に到達するまでの手数をメモ化
	memo[n] = result

	return result
}

func main() {
	// 1つ以上の整数が1行に1値ずつ並び
	input := os.Stdin.ReadAll()
	var tokens []int
	for _, token := range input {
		t, err := strconv.Atoi([]byte(token))
		if err == nil {
			tokens = append(tokens, t)
		}
	}

	// 各クエリに計算
	total := 0
	for _, n := range tokens {
		total += compute(n)
	}

	fmt.Println(total)
}
