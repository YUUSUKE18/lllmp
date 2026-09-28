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
	var numbers []int
	for {
		n, err := sc.ReadLine()
		if err != nil {
			if err == os.ErrUnexpectedEOF {
				break
			}
			break
		}
		if n == "" {
			break
		}
		var num int
		if err := strconv.Atoi(n); err == nil {
			nums = append(nums, num)
		}
	}
	memo := make(map[int]int)
	total := 0
	for _, num := range nums {
		if num == 1 {
			total += 1
			continue
		}
		if m, ok := memo[num]; ok {
			total += m
			continue
		}
		steps := 0
		current := num
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}
		memo[num] = steps
		total += steps
	}
	fmt.Printf("total=%d\n", total)
}
