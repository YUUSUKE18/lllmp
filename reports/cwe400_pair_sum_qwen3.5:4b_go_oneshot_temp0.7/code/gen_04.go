package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines, count := 0, 0
	var nums []int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		nums = append(nums, parseInt(line))
		count++
	}

	target := parseInt(sc.Text())
	sum := int64(0)
	pairs := 0
	for i, n1 := range nums {
		sum += n1
		if sum > target {
			break
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
