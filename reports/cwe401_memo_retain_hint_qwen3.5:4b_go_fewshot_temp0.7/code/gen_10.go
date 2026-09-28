package main

import (
	"bufio"
	"fmt"
	"os"
)

func collatzStep(n int64) int64 {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return collatzStep(n / 2) + 1
	}
	return collatzStep(3*n + 1) + 1
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 || line[0] != ' ' && line[0] != '\t' { // 空白行や空文字は無視する (ただし、入力例には整数のみあるので、単純に解析)
			continue
		}

		val, err := fmt.Sscanf(line, "%d", &val)
		if err != nil || val != 1 {
			continue
		}

		if res, ok := memo[val]; ok {
			total += res
		} else {
			step := collatzStep(val)
			memo[val] = step
			total += step
		}
	}

	fmt.Printf("total=%d\n", total)
}
