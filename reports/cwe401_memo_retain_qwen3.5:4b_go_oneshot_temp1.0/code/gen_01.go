package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int64 = make(map[int]int64)

func calculateStep(n int64, cache *map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	key := int(n)
	if val, ok := (*cache)[key]; ok {
		return val
	}

	step := int64(0)
	if n%2 == 0 {
		nextN := n / 2
		step = calculateStep(nextN, cache)
	} else {
		nextN := 3*n + 1
		step = calculateStep(nextN, cache)
	}

	val := step + 1
	(*cache)[key] = val
	return val
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		var n int64
		split := strings.Fields(line)
		if len(split) == 1 {
			n, err := strconv.ParseInt(split[0], 10, 64)
			if err != nil {
				continue
			}
		} else if len(split) > 1 {
			for _, s := range split {
				val, err := strconv.ParseInt(s, 10, 64)
				if err != nil {
					continue
				}
				sum += calculateStep(val, &memo)
			}
			totalSteps = sum
		}

		totalSteps = sum
	}

	fmt.Printf("total=%d\n", totalSteps)
}
