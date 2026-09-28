package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target := int64(sc.Text())
	nums := make([]int64, 0)
	for {
		sc.Scan()
		if !sc.Scan() {
			break
		}
		n, err := strconv.ParseInt(sc.Text(), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	count := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
