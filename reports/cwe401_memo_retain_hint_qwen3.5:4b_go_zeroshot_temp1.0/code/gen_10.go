package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	mem := make(map[int64]int)
	mem[1] = 0
	reader := bufio.NewReader(os.Stdin)

	var total int64
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	for line != "" {
		line = string(line)
		line = trimLine(line)
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(trimLine(line))
		if err != nil || n < 1 {
			continue
		}

		if val, ok := mem[n]; ok {
			total += int64(val)
			continue
		}

		current := int64(n)
		steps := 0

		for current != 1 {
			switch current % 2 {
			case 0:
				current = current / 2
			default:
				current = 3*current + 1
			}
			steps++
		}

		mem[current] = steps
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
