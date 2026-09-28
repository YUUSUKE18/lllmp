package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if _, err := fmt.Fscan(reader, &target); err != nil {
		os.Exit(1)
	}

	count := 0
	nums := make([]int64, 0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if len(line) == 0 {
			continue
		}
		num, err := fmt.SscanInt(line)
		if err != nil {
			continue
		}
		nums = append(nums, num)
	}

	counters := make(map[int64]int)
	for _, v := range nums {
		if target-v >= 0 {
			diff := target - v
			if c, ok := counters[diff]; ok {
				count += c
			}
			counters[v]++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
