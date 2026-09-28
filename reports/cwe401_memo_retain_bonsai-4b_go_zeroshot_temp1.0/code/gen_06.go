package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)

func handCount(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		result := 0
	} else if n%2 == 0 {
		result := handCount(n / 2) + 1
	} else {
		result := handCount(3*n + 1) + 1
	}
	memo[n] = result
	return result
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		if line == "1" {
			continue
		}
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		// クエリが正整数として読み込まれたら処理
		result := handCount(int(line))
		fmt.Fprintf(os.Stdout, "total=%d\n", result)
	}
	fmt.Println("total=", result)
}
