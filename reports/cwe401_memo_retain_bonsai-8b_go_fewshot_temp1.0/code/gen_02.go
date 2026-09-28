package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func collate(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	memo[n] = collate(n/2) + (n%2 != 0 ? 1 : 0)
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for {
		n, err := sc.ReadInt()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if n == 0 {
			continue
		}
		total += collate(n)
	}
	fmt.Printf("total=%d\n", total)
}
