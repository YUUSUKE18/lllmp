package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
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

		step := int64(0)
		curr := n
		for curr != 1 {
			if curr%2 == 0 {
				curr = curr / 2
			} else {
				curr = 3*curr + 1
			}
			step++
		}

		mem[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
