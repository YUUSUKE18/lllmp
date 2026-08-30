package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的計算とメモ化
		var steps int64
		if n%2 == 0 {
			// nが偶数なら n/2
			steps = calculateSteps(n/2)
		} else {
			// nが奇数なら 3n+1
			steps = calculateSteps(3*n + 1)
		}

		// 現在のnから1に到達するまでの手数を計算
		// nが偶数なら n/2
		// nが奇数なら 3n+1
		// この問題は、nが与えられたときの「操作の回数」を求めるのではなく、
		// nから1に到達するまでの「操作の総数」を求める問題と解釈します。
		// 課題の記述を再解釈します:
		// "n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
		// これは、nからスタートして、操作を繰り返して1に到達するまでのステップ数を求める問題です。

		// 再帰的な計算でステップ数を求める
		// nが1のときの手数は0
		// n > 1 のとき、次の値は n/2 (n偶) または 3n+1 (n奇)
		// この問題は、nからスタートして1に到達するまでの操作回数を求めるため、
		// 以下の再帰的な定義で進めます。

		var count func(n int) int64
		count = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var next int
			if n%2 == 0 {
				next = n / 2
			} else {
				next = 3*n + 1
			}

			result := 1 + count(next)
			memo[n] = result
			return result
		}

		steps = count(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
