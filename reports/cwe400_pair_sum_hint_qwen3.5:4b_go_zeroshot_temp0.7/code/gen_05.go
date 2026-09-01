package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}

	target, err = fmt.Sscanf(line, "%d", &target)
	if err != nil {
		return
	}

	counts := make(map[int64]int64)
	totalPairs := int64(0)

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line = scanner.Text()
		if line == "" {
			continue
		}

		var num int64
		fmt.Sscanf(line, "%d", &num)
		if err != nil {
			continue
		}

		counts[num]++
	}

	for k1, c1 := range counts {
		k2 := target - k1
		c2 := counts[k2]
		if k2 == k1 {
			totalPairs += c1 * (c1 - 1) / 2
		} else if c2 > 0 {
			totalPairs += c1 * c2
		}
	}

	fmt.Printf("pairs=%d\n", totalPairs)
}
