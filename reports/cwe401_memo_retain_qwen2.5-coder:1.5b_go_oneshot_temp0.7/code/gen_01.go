package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	memo := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else if n%2 == 0 {
			if _, ok := memo[n/2]; !ok {
				memo[n/2] = calculate(n/2, memo)
			}
			total += memo[n/2] + 1
		} else {
			if _, ok := memo[3*n+1]; !ok {
				memo[3*n+1] = calculate(3*n+1, memo)
			}
			total += memo[3*n+1] + 1
		}
	}
	fmt.Printf("total=%d\n", total)
}

func calculate(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	} else if n%2 == 0 {
		return 1 + calculate(n/2, memo)
	} else {
		return 1 + calculate(3*n+1, memo)
	}
}
