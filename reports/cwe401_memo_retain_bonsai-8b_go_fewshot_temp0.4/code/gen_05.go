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
	total := 0
	for {
		n, err := sc.ReadInt()
		if err != nil {
			if err == fmt.Errorf("invalid input") {
				continue
			}
			break
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if _, exists := memo[n]; exists {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n+1]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
