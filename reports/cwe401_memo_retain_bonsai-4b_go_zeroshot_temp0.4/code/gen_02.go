package main

import (
	"fmt"
	"bufio"
	"regexp"
)

var memo = make(map[int]int)

func solve(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}

	var current = n
	var steps := 0

	// 1 から n/2 までを繰り返し、最終状態に達するまでの手数を計算
	for current != 1 {
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3 * current + 1
		}
		steps++

		// 64bit 整数の範囲内に収まり
		if current > 2**63 {
			break
		}
	}

	// 1 に到達した時点で手数をメモ化
	memo[n] = steps
	return steps
}

func main() {
	var reader bufio.Reader
	// 1 以上の整数を読み取る
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if err != nil {
			continue
		}

		// 1 以上、整数として解析
		// 64bit 整数に収まり
		// 空行や非整数を無視
		re := regexp.MustCompile(`^(\d+)$`)
		matches := re.FindStringSubmatch(line, 1, nil)
		if matches == nil {
			continue
		}

		n := int(matches[1])
		if n <= 0 {
			continue
		}

		// メモ化
		result := solve(n)
		fmt.Printf("%d\n", result)
	}
}
