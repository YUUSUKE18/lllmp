package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

func main() {
	// メモライザ
	memo := make(map[int]int)

	// リアルタイムの入力処理
	for {
		line, err := os.Readline(os.Stdin)
		if err != nil {
			if err == os.EOF {
				break
			}
			fmt.Fprintf(os.Stderr, "Invalid input: %s\n", err)
			continue
		}
		if line == "" {
			continue
		}
		n, _ := parseInput(line)
		if n == 0 {
			continue
		}
		// メモライザを使用して計算
		total := calculateSteps(n, memo)
		fmt.Printf("total=%d\n", total)
	}
}

func parseInput(line string) (int, error) {
	n := 0
	for _, ch := range line {
		if ch >= '0' && ch <= '9' {
			n = n*10 + (ch-'0')
		}
	}
	if n == 0 {
		return 0, fmt.Errorf("invalid input: 0")
	}
	return n, nil
}

func calculateSteps(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if m, ok := memo[n]; ok {
		return m
	}
	memo[n] = 1 + calculateSteps(n/2, memo) if n%2 == 0 else 1 + calculateSteps(3*n+1, memo)
	return memo[n]
}
