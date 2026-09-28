package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
	"unicode"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err != nil {
			continue
		}
		if n := int(sc.Text()); n <= 0 {
			continue
		}
		if m, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", m)
			continue
		}
		memo[n] = 0
		if n == 1 {
			fmt.Printf("total=%d\n", m)
			continue
		}
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		memo[n] = 1 + memo[n]
	}
}
