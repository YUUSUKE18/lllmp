package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	var target int64
	if scanner.Scan() && scanner.Text() != "" {
		val, err := fmt.ScanInt64(scanner.Text())
		if err != nil {
			return
		}
		target = val
	} else {
		return
	}

	count := 0
	found := make(map[int64]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		val, err := fmt.ScanInt64(line)
		if err != nil {
			continue
		}

		targetMinusVal := target - val
		if freq, ok := found[targetMinusVal]; ok {
			count += freq
		}

		found[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
