package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func f(n int64) int64 {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return n/2
	}
	return 3*n + 1
}

var memo = make(map[int64]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64

	for sc.Scan() {
		line, _ := strconv.Atoi(sc.Text())
		if line == 0 || line <= 0 {
			continue
		}

		n := int64(line)
		count := 1
		for n != 1 {
			n = f(n)
			if n > 9223372036854775807 || n < -9223372036854775808 {
				break
			}
			if result, ok := memo[n]; ok {
				count += result
			} else {
				memo[n] = 1 + f(n)
			}
		}
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
