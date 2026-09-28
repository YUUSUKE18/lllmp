package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func main() {
	scanner := os.ScanInput()
	for scanner.Scan() {
		s := strings.TrimSpace(scanner.Text())
		if s == "" {
			continue
		}
		n, _ := parseInt(s)
		if memo[n] != 0 {
			fmt.Println("total=", memo[n])
			continue
		}
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3 * current + 1
			}
			count++
			if current > 2*int64(2048) { // 64bit intの最大値
				memo[current] = count
				fmt.Println("total=", count)
				break
			}
		}
		if current == 1 {
			memo[current] = count
		}
	}
}

func parseInt(s string) (int, error) {
	n, _ := strconv.Atoi(s)
	if n < 1 {
		return 0, fmt.Errorf("invalid input: must be a positive integer")
	}
	return n, nil
}
