package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int)

	var total int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // 末尾の改行を削除
		if len(line) == 0 {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n <= 0 {
			continue
		}

		steps := getSteps(n, cache)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func getSteps(n int64, cache map[int64]int) int {
	if v, ok := cache[n]; ok {
		return v
	}

	steps := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}

	cache[n] = steps
	return steps
}
