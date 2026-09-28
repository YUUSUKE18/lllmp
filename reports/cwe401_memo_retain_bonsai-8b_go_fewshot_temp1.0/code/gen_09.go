package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	memo := make(map[int]int)
	var total int
	for {
		n, err := sc.ReadInt()
		if err != nil {
			break
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if n in memo {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n+1]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
