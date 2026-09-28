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
		if line == "" {
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
		total := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			total += 1
		}
		memo[current] = total
		fmt.Printf("total=%d\n", total)
	}
	fmt.Println("total=", sumMemo())
}

func parseInt(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	if n < 1 {
		return 0, nil
	}
	return n, nil
}

func sumMemo() int {
	sum := 0
	for key := range memo {
		sum += memo[key]
	}
	return sum
}
