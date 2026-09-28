package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var values []int
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		if _, err := strconv.Atoi(n); err != nil {
			continue
		}
		if n == 0 {
			continue
		}
		// 1 に達するまでの手数を計算
		handsh = calculateHandsh(n, memo)
		values = append(values, handsh)
	}
	fmt.Printf("total=%d\n", sum(values))
}

func calculateHandsh(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if _, exists := memo[n]; exists {
		return memo[n]
	}
	if n%2 == 0 {
		result := calculateHandsh(n / 2, memo)
	} else {
		result := 3 * n + 1
		// 1 に達するまでの手数を計算
		// 3n+1 が1に達するまでの手数は、1を含む
		// 3n+1 が1に達するまでの手数は、n/2 に達するまでの手数
		// 1 に達するまでの手数は、1 に達するまでの手数
		// 1 に達するまでの手数は、1 に達するまでの手数
		// 1 に達するまでの手数は、1 に達するまでの手数
		result = 1 + calculateHandsh(n, memo)
	}
	memo[n] = result
	return result
}

func sum(values []int) int {
	total := 0
	for _, v := range values {
		total += v
	}
	return total
}
