package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err1 := strconv.ParseInt(sc.Text(), 10, 64)
	if err1 != nil || target <= 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	count := int64(0)
	sums := make(map[int64]int64)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		needed := target - val
		if s, ok := sums[needed]; ok {
			count += int64(s)
		}
		sums[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
