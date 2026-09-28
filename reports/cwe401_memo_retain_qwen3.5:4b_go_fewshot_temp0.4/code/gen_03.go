package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int

func main() {
	memo = make(map[int]int)
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil || n < 1 {
			continue
		}
		if result, ok := memo[n]; ok {
			total += result
			continue
		}
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
