package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err != nil {
			continue
		}

		if n := int(sc.Text()); n == 1 {
			total += 0
			continue
		}

		if m, ok := memo[n]; ok {
			total += m
			continue
		}

		memo[n] = 1 + (n%2 == 0 ? n/2 : 3*n + 1)
		n = memo[n]

		if n == 1 {
			total += memo[n]
			break
		}
	}

	fmt.Printf("total=%d\n", total)
}
