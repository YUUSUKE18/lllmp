package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		hand := getStep(n, mem)
		total += hand
	}

	fmt.Printf("total=%d\n", total)
}

func getStep(n int64, mem map[int64]int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := mem[n]; ok {
		return v
	}
	step := 1
	nextN := n / 2
	if n % 2 == 1 {
		nextN = 3*n+1
	}
	mem[n] = getStep(nextN, mem) + step
	return mem[n]
}
