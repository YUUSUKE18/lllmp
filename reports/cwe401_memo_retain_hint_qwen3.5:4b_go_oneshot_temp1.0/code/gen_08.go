package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func collatzStep(n int64) int64 {
	if n == 1 {
		return 0
	}
	var res int64
	for n != 1 {
		switch n % 2 {
		case 0:
			n = n / 2
		default:
			n = 3*n + 1
		}
		res++
	}
	return res
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		fields := strings.Fields(line)
		var n int64
		for _, f := range fields {
			val, err := strconv.ParseInt(f, 10, 64)
			if err != nil {
				continue
			}
			n = val
			break
		}

		if n == 1 {
			total += cache[1]
			continue
		}

		if res, ok := cache[n]; ok {
			total += res
			continue
		}

		step := collatzStep(n)
		cache[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
