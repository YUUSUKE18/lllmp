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

	nextVal := n
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
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		total += int64(steps(n))
	}

	fmt.Printf("total=%d\n", total)
}
