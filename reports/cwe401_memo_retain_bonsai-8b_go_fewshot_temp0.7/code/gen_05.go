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
	var numbers []int
	for {
		n, err := sc.Scan()
		if err != nil {
			if err == bufio.ErrUnexpectedEOF {
				break
			}
			continue
		}
		if n == 0 {
			continue
		}
		var num int
		if err := strconv.Atoi(n); err != nil {
			continue
		}
		numbers = append(numbers, num)
	}
	memo := make(map[int]int)
	total := 0
	for _, n := range numbers {
		if n == 1 {
			total += 0
			continue
		}
		if m, ok := memo[n]; ok {
			total += m
			continue
		}
		count := 0
		for n != 1 {
			n = n%2 == 0 ? n/2 : 3*n + 1
			count++
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
