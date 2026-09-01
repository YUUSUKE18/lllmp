package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if _, err := fmt.Fscanf(reader, "%d", &target); err != nil {
		return
	}

	count := 0
	m := make(map[int64]int, 1<<32)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		if line == "" {
			continue
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)

		if diff := target - val; diff >= 0 && m[diff] > 0 {
			count += m[diff]
			m[val]++
		} else {
			m[val]++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
