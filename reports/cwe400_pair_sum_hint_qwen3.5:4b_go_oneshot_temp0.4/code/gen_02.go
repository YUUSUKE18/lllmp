package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	foundTarget := false

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := fmt.Sscanf(line, "%d", &n); err != nil {
			continue
		}

		if foundTarget {
			sum := target - n
			if sum > 0 && mapInt[sum] > 0 {
				count += mapInt[sum]
			}
		} else {
			if n == target {
				foundTarget = true
			}
			mapInt[n]++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}

var mapInt map[int64]int
var count int64

func init() {
	mapInt = make(map[int64]int)
	count = 0
}
