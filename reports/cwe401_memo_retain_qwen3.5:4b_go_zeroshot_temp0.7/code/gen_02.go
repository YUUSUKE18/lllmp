package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	mem := make(map[int64]int) // 1 に到達するまでの手数
	mem[1] = 0

	reader := bufio.NewReader(os.Stdin)
	var total int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = line[:len(line)-1] // 改行除去
		if line == "" {
			continue
		}

		var n int64
		_, err = fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n < 1 {
			continue
		}

		count := getCollatzSteps(n, mem)
		total += count
	}

	fmt.Printf("total=%d\n", total)
}

func getCollatzSteps(n int64, mem map[int64]int) int {
	if val, ok := mem[n]; ok {
		return val
	}

	var steps int
	if n%2 == 0 {
		steps = 1 + getCollatzSteps(n/2, mem)
	} else {
		steps = 1 + getCollatzSteps(3*n+1, mem)
	}

	mem[n] = steps
	return steps
}
