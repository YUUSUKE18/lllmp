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
	target, _ = sc.ReadInt64()

	count := 0
	sums := make(map[int64]int) // stores count of each sum found so far

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
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
