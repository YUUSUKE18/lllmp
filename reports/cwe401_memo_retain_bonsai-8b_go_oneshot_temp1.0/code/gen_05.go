package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	for _, line := range strings.Fields(sc.Text()) {
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
			continue
		}
		if n % 2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		if n in memo {
			total += memo[n]
			continue
		}
		memo[n] = 1 + memo[n/2] if n % 2 == 0 else 1 + memo[3*n + 1]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
