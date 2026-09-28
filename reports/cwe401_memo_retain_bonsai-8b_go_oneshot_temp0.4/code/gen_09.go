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
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if err := sc.Text(); err != nil {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if !line {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0\n")
			return
		}
		if n in memo {
			total += memo[n]
			continue
		}
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			if current in memo {
				memo[current] = count
				continue
			}
			memo[current] = count
		}
		memo[n] = count
		total += count
	}
	fmt.Println("total=" + strconv.Itoa(total) + "\n")
}
