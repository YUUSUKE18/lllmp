package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func solve() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int) // メモ化用のマップ: 整数 -> 手数
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		cost := 0
		current := n
		for current != 1 {
			idx, ok := mem[current]
			if !ok {
				mem[current] = cost
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			cost++
		}
		total += cost
	}

	fmt.Printf("total=%d\n", total)
}

func main() {
	solve()
}
