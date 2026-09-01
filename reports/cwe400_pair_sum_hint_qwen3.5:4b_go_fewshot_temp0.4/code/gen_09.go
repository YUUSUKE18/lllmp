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
		return
	}
	n, err := fmt.Sscanf(sc.Text(), "%d", &target)
	if n != 1 || err != nil {
		return
	}

	count := int64(0)
	found := make(map[int64]int64)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if fmt.Sscanf(line, "%d", &val) != 1 {
			continue
		}

		diff := target - val
		if freq, ok := found[diff]; ok {
			count += freq
		}
		found[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
