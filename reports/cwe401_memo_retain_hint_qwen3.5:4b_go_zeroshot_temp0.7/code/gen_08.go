package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	memo := make(map[int64]int)
	total := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = string(line)
		if line == "" || (len(line) > 0 && line[0] < '0' || line[len(line)-1] > '9') {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		count := getCollatz(n, memo)
		total += count
	}

	fmt.Printf("total=%d\n", total)
}

func getCollatz(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}

	if val, ok := memo[n]; ok {
		return val
	}

	step := 0
	if n%2 == 0 {
		n /= 2
	} else {
		n = 3*n + 1
	}
	step += getCollatz(n, memo)

	memo[n] = step + 1
	return step + 1
}
