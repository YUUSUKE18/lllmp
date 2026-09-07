package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	sum := 0
	memo := make(map[int]int)
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		if n == 1 {
			sum += 0
		} else {
			n, memo[n] = helper(n, memo)
			sum += n
		}
	}
	fmt.Printf("total=%d\n", sum)
}

func helper(n int, memo map[int]int) (int, map[int]int) {
	if memo[n] != 0 {
		return memo[n], memo
	}
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	memo[n] = n
	return helper(n, memo)
}
