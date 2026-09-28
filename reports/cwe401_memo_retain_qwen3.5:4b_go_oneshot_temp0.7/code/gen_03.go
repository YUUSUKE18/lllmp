package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func compute(n int64, total *int) {
	if n == 1 {
		*total += 0
		return
	}

	if val, ok := memo[n]; ok {
		*total += val
		return
	}

	next := n
	step := 1
	for next != 1 {
		if next%2 == 0 {
			next = next / 2
		} else {
			next = 3*next + 1
		}
		step++
	}

	memo[n] = step
	compute(next, total)
	*total += memo[n] // Add the steps taken in this iteration to the stored value for n
}

func main() {
	var total int
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total = compute(n, &total)
	}

	fmt.Printf("total=%d\n", total)
}
