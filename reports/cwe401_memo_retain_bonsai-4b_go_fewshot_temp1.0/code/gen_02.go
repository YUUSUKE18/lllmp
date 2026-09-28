package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var numbers []int

	for _, line := range sc.Text().Split("\n", 1) {
		// 1 以上の整数を读める
		if line == "" {
			continue
		}
		// コマンド行をスキップして、単語と処理
		words := strings.Fields(line)
		for _, w := range words {
			if w == "" {
				continue
			}
			n, err := strconv.Atoi(w)
			if err != nil {
				continue
			}
			if n > 0 {
				num, _ := n / 2
				if num > 1 {
					// 1 に至達まで処理する処理ループ
					cycles := 0
					current := n
					while current != 1 {
						current = (current % 2 == 0) ? current/2 : 3*current + 1
						cycles++
					}
					// 1 に達するまでの処理回数をメモ化
					if memo[current] == 0 {
						memo[current] = cycles
					}
				}
			}
		}
		numbers = append(numbers, n)
	}

	var totalCycles int
	for _, n := range numbers {
		if memo[n] == 0 {
			memo[n] = 0
		}
		if n == 1 {
			continue
		}
		cycles := memo[n]
		totalCycles += cycles
	}

	fmt.Printf("total=%d\n", totalCycles)
}
