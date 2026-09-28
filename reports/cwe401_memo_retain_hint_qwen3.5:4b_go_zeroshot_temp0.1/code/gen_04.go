package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	mem := make(map[int64]int)
	total := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = string(line)
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := fmt.Scanln(&n); err != nil {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		if val, ok := mem[n]; ok {
			total += val
			continue
		}

		step := 0
		for n != 1 {
			if n%2 == 0 {
				n = n / 2
			} else {
				n = 3*n + 1
			}
			step++
		}

		mem[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
