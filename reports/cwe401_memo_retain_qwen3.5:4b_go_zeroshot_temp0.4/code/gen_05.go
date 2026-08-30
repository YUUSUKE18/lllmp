package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	mem := make(map[int]int64)
	total := int64(0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = line[:len(line)-1] // 末尾の改行を削除
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		steps := getSteps(n, mem)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func getSteps(n int, mem map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := mem[n]; ok {
		return val
	}

	var steps int64 = 1
	next := n
	if next%2 == 0 {
		next /= 2
	} else {
		next = 3*n + 1
	}

	steps += getSteps(int(next), mem)
	mem[n] = steps
	return steps
}
