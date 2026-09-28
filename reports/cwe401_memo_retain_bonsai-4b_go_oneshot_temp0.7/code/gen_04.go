package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func countSteps(n int) int {
	if memo[n] != nil {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + countSteps(n/2)
	} else {
		return 1 + countSteps(3*n + 1)
	}
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var totalSteps int
	for {
		line := ""
		for {
			line += fmt.Sprint(sc)
			if line == "" {
				break
			}
			if _, err := strconv.Atoi(line); err != nil {
				break
			}
			if _, err := strconv.Atoi(line); err != nil {
				break
			}
		}
		if line == "" {
			break
		}
		// クエリが1なら0、他の場合は1番の手数を計算
		// ここで、1の処理を手数の0として扱う（最初のクエリ）
		if line == "1" {
			// 1は0
			continue
		}
		// 1以上で整数として読み取る
		n := strconv.Atoi(line)
		if n <= 0 {
			continue
		}
	_steps := countSteps(n)
		totalSteps += steps
		// ここでは1番のクエリを処理し、結果をメモ化
		memo[n] = steps
	}
	fmt.Printf("total=%d\n", totalSteps)
}
