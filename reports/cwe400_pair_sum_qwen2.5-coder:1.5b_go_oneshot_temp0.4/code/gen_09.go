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
	sc.Scan()
	sc.Scanln()
	nums := make([]int, 0)
	for sc.Scan() {
		f := sc.Text()
		if f == "" {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	if len(nums) < 2 {
		fmt.Printf("pairs=0\n")
		return
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
