package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int64]int)

func collatzSteps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	steps := 0
	for n > 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}
	memo[n] = steps
	return steps
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var total int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = string(line)
		if len(line) == 0 || line[0] == '\n' {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if n > 0 {
			total += collatzSteps(n)
		}
	}

	fmt.Printf("total=%d\n", total)
}
