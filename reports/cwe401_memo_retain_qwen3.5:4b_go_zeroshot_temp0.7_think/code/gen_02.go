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

	var nextVal int64
	if n%2 == 0 {
		nextVal = n / 2
	} else {
		nextVal = 3*n + 1
	}

	res := 1 + steps(nextVal)
	memo[n] = res
	return res
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		token := scanner.Text()
		if token == "" {
			continue
		}

		n, err := strconv.ParseInt(token, 10, 64)
		if err != nil || n < 1 {
			continue
		}

		total += int64(steps(n))
	}

	fmt.Printf("total=%d\n", total)
}
