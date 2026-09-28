package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.Atoi(sc.Text())
	if err != nil || target == 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	sum := int64(0)
	count := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		sum += int64(val)
		count++
	}

	if count < 2 || sum%count != 0 {
		fmt.Printf("pairs=0\n")
		return
	}

	targetSum := sum / count
	pairs := int64(0)
	sorted := make([]int64, count)
	copy(sorted, []int64(sum))
	for i := 0; i < count; i++ {
		sorted[i] = sorted[i]
	}

	for i := 0; i < count-1; i++ {
		for j := i + 1; j < count; j++ {
			if sorted[i]+sorted[j] == targetSum {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
