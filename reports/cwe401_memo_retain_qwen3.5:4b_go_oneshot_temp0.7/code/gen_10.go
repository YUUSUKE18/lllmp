package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func collatzStep(n int) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	step := int64(0)
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	
	// 再帰的に計算し、結果をキャッシュ
	step += collatzStep(n)
	memo[n] = step
	
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		step := collatzStep(n)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
