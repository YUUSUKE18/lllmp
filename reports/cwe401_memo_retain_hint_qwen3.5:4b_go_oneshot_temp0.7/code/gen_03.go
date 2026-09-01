package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func collatzStep(n int64, total *int64) {
	if n == 1 {
		return
	}

	if v, ok := memo[n]; ok {
		*total += v
		return
	}

	var step int64
	switch {
	case n%2 == 0:
		step = 1 + collatzStep(n/2, total)
	default:
		step = 1 + collatzStep(3*n+1, total)
	}

	if !ok {
		memo[n] = step
	}

	*total += step
}

func main() {
	var total int64
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
		collatzStep(n, &total)
	}

	fmt.Printf("total=%d\n", total)
}
