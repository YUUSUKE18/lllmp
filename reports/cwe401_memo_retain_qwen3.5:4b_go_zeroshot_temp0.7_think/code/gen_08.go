package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int)

func steps(n int) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	var res int
	nextN := n
	if nextN%2 == 0 {
		nextN /= 2
	} else {
		nextN = n*3 + 1
	}

	res = steps(int(nextN)) + 1
	memo[n] = res
	return res
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil || n <= 0 {
			continue
		}
		total += steps(n)
	}

	fmt.Printf("total=%d\n", total)
}
