package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalCount := 0
	memo := make(map[int]int)

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			count := 0
			memo[1] = 0
			totalCount += count
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalCount += val
			continue
		}

		// 計算とメモ化
		current := n
		steps := 0
		path := []int{} // 経路を記録してメモ化に利用

		for current != 1 {
			path = append(path, current)
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		// 経路を逆順に辿りながらメモ化
		for i := len(path) - 1; i >= 0; i-- {
			val := path[i]
			steps++
			memo[val] = steps
		}

		totalCount += steps
	}

	fmt.Printf("total=%d\n", totalCount)
}
