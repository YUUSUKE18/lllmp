package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target := 0
	first := true
	var nums []int
	for _, line := range sc.Lines() {
		if first {
			if _, err := strconv.Atoi(line); err == nil {
				target = line
				first = false
			}
		} else {
			if _, err := strconv.Atoi(line); err == nil {
				nums = append(nums, int(line))
			}
		}
	}
	pairs := 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
