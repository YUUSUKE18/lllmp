package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func main() {
	scanner := os.Scan()
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if len(line) == 0 {
			continue
		}
		n, err := parseInt(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0")
			continue
		}
		// メモリ化されている場合
		if val, exists := memo[n]; exists {
			fmt.Println("total=", val)
			continue
		}
		// メモリ化されていない場合
		memo[n] = steps(n)
		// 結果を出力
		fmt.Println("total=", memo[n])
	}
}

func parseInt(s string) (int, error) {
	n, err := parse(s)
	if err != nil {
		return 0, err
	}
	if n <= 0 {
		return 0, nil
	}
	return n, nil
}

func steps(n int) int {
	if n == 1 {
		return 0
	}
	if val, exists := memo[n]; exists {
		return val
	}
	memo[n] = steps(n/2) + 1
	return memo[n]
}
