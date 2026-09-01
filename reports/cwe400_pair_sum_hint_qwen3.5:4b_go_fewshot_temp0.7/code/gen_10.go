package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	target, err := r.ReadInt64()
	if err != nil || target == 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	sums := map[int64]int{}
	count := 0

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}

		trimmed := strings.TrimSpace(line)
		if trimmed == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmed, 10, 64)
		if err != nil {
			continue
		}

		complement := target - val
		if complement < val {
			cmpCount := sums[val]
			count += cmpCount
		} else {
			sums[complement]++
		}
		sums[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
