package main

import (
	"bufio"
	"fmt"
	"os"
)

var cache = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	n := 0
	total := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else if n%2 == 0 {
			if cache[n/2] == 0 {
				cache[n/2] = calculate(n/2)
			}
			total += cache[n/2]
		} else {
			if cache[3*n+1] == 0 {
				cache[3*n+1] = calculate(3*n+1)
			}
			total += cache[3*n+1]
		}
	}
	fmt.Printf("total=%d\n", total)
}

func calculate(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calculate(n/2)
	} else {
		return 1 + calculate(3*n+1)
	}
}
