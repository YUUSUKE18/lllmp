package main

import (
	"bufio"
	"fmt"
	"io"
)

var memo map[int64]int64

func collatzStep(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	var step int64
	switch n % 2 {
	case 0: // 偶数
		step = collatzStep(n / 2)
	default: // 奇数
		step = collatzStep(3*n + 1)
	}

	memo[n] = step
	return step
}

func main() {
	reader := bufio.NewReader(os.Stdin) // os が使われているため、os パッケージが必要
	if err := readMain(reader); err != nil {
		os.Exit(1)
	}
}

import (
	"os"
)

func readMain(r io.Reader) error {
	sum := int64(0)
	mem = make(map[int64]int64)
	scan := bufio.NewScanner(r)

	for scan.Scan() {
		line, err := bufio.NewReader(scan).ReadBytes('\n')
		if err != nil {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if n > 0 {
			step := collatzStep(n)
			sum += step
		}
	}

	fmt.Printf("total=%d\n", sum)

	return scan.Err()
}
