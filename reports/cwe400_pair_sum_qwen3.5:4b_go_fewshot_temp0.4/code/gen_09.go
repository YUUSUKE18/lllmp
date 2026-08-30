package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		fmt.Println("pairs=0")
		return
	}
	target, _ = fmt.Sscanf(sc.Text(), "%d", &target)

	counts := make(map[int64]int64)
	totalSum := int64(0)
	pairs := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := sc.Err(); err != nil {
			break
		}

		complement := target - val
		if c, ok := counts[complement]; ok {
			pairs += c
		}
		counts[val]++
		totalSum += val
	}

	fmt.Printf("pairs=%d\n", pairs)
}
