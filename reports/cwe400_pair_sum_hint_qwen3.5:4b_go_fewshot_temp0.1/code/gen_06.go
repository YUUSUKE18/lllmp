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
		fmt.Printf("pairs=0\n")
		return
	}
	target, _ = sc.Scan().Int64()

	type pair struct {
		sum   int64
		count int
	}
	pairs := make(map[int64]int)
	var totalSum int64
	var count int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		totalSum += val

		complement := target - val
		if c, ok := pairs[complement]; ok {
			count += int64(c)
		}
		pairs[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
