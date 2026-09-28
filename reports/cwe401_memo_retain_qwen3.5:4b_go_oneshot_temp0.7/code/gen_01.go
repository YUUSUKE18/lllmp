package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int = make(map[int]int)

func collatzStep(n int) int {
	result := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		result++
	}
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		step := 0
		if cached, ok := memo[n]; ok {
			step = cached
		} else {
			step = collatzStep(n)
			memo[n] = step
		}

		total += step
	}

	fmt.Printf("total=%d\n", total)
}
