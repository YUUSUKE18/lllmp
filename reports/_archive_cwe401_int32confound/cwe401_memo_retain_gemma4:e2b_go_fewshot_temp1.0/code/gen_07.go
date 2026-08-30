package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n が 1 のときの手数は 0
			// total には 0 を加算
		} else {
			// 変換操作を繰り返す
			current := n
			steps := 0
			for current != 1 {
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
			total += int64(steps)
		}
	}

	fmt.Printf("total=%d\n", total)
}
