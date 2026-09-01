package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int) // 使用 int64 キーで、32bit 範囲を超える値も対応可能

	var total int64 = 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		// 空行や整数として解釈できない行は無視
		line = line[:len(line)-1] // 改行文字を切り捨てる
		if line == "" || (line[0] < '0' || line[0] > '9') {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		total += collatzStep(n, cache)
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int64, cache map[int64]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := cache[n]; ok {
		return val
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
