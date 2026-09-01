package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	total := 0

	for sc.Scan() {
		line, _ := strconv.Atoi(sc.Text())
		if line < 0 {
			continue
		}

		n := int64(line)
		step := 0
		for n != 1 {
			key := n
			val, ok := memo[key]
			if !ok {
				memo[key] = step
			} else {
				step += val
				break
			}

			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			step++
		}

		total += step
	}

	fmt.Printf("total=%d\n", total)
}
