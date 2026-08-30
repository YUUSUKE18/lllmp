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
		return
	}

	count := 0
	sums := make(map[int64]int)

	for {
		line, _ := reader.ReadString('\n')
		if line == "" {
			break
		}
		line = line[:len(line)-1]
		if line == "" {
			continue
		}
		val, err := fmt.ScanInt64(&line)
		if err != nil {
			continue
		}

		if target-val >= 0 {
			diff := target - val
			if c, ok := sums[diff]; ok {
				count += c
			}
			sums[val]++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
