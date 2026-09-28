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
	total := 0
	memo := make(map[int]int)

	for { ; } {
		sc.Scan()
		if !sc.Done() {
			break
		}
		if !unicode.IsDigit(sc.Text()) {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			memo[n] = 0
			continue
		}
		if memo[n] != 0 {
			continue
		}
		count := 0
		curr := n
		for curr != 1 {
			count++
			if curr%2 == 0 {
				curr /= 2
			} else {
				curr = 3*curr + 1
			}
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
