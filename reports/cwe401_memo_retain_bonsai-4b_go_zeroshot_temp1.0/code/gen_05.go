package main

import (
	"fmt"
	"sync"
)

var memo = make(map[int]int)
var calculated = sync.WaitGroup

func calculateStep(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}

	var steps = 0
	current := n
	if current == 1 {
		return 0
	}

	// 奇数の場合
	if current%2 == 1 {
		current = 3 * current + 1
	.steps++
	} else {
		current = current / 2
		// 偶数の場合
		if current == 1 {
			return steps
		}
	}

	// 1に達するまでの手数をメモに追加
	if current == 1 {
		memo[n] = steps
		return steps
	}

	// 複数のステップが同じ
	if current, exists := memo[current]; exists {
		return memo[current]
	}

	// ステップ数を再計算
	memo[current] = 1 + calculateStep(current)
	// ステップ数をメモに追加
	*calculated.Add(1)

	return steps
}

func main() {
	var input string
	for {
		if next, err := readline(); err != nil {
			if err == eol {
				break
			}
		}
		input += " "
	}
	// 1行に1分1に整数を分ける
	tokens := input.stripRight("\n").split(" ", -1)
	var validInts = []int{}
	for _, token := range tokens {
		if token == "" {
			continue
		}
		if token == "1" {
			validInts = append(validInts, 1)
			continue
		}
		if _, err := strconv.Atoi(token); err == nil {
			validInts = append(validInts, int(token))
		}
	}

	// メモ化
	for _, n := range validInts {
		if n <= 0 {
			continue
		}
		calc := calculateStep(n)
		memo[n] = calc
	}

	// チョーチが1
	total := 0
	for _, n := range validInts {
		if n > 0 {
			total += calculateStep(n)
		}
	}

	fmt.Println(total)
}
