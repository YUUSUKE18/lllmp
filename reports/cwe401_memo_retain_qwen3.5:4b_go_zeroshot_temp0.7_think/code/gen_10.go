package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	nextN := n
	if nextN%2 == 0 {
		nextN = nextN / 2
	} else {
		nextN = 3*nextN + 1
	}

	res := 1 + steps(nextN)
	memo[n] = res
	return res
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		token := scanner.Text()
		n, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue
		}

		steps := steps(n)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
