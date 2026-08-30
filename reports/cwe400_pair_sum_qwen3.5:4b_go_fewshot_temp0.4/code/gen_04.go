package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetStr, hasTarget := sc.Scan()
	if !hasTarget || targetStr == "" {
		fmt.Printf("pairs=0\n")
		return
	}

	target, err := strconv.Atoi(targetStr.(string))
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	sums := make(map[int64]int)
	count := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		complement := target - val
		if c, ok := sums[complement]; ok {
			count += c
		}
		sums[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
