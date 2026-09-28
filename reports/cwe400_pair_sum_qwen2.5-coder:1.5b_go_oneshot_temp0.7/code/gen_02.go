package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int
	sc.Scan()
	target, _ = strconv.Atoi(sc.Text())

	pairs := 0
	var nums []int
	for sc.Scan() {
		if len(nums) == 0 || nums[len(nums)-1] != sc.Text() {
			nums = append(nums, sc.Text())
		}
	}

	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
