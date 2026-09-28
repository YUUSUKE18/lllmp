package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		n, err := sc.ReadInt()
		if err != nil {
			if err == fmt.Errorf("invalid input number") {
				continue
			}
			break
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if _, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n+1]
		total += memo[n]
	}
}
