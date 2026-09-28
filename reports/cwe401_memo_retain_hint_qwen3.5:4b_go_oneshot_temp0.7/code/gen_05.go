package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo map[int]int64 = make(map[int]int64)

func steps(n int) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	var step int64 = 0
	if n%2 == 0 {
		step += 1 + steps(n/2)
	} else {
		step += 1 + steps(3*n+1)
	}
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		f, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += steps(int(f))
	}
	fmt.Printf("total=%d\n", total)
}
