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
	var nums []int
	for {
		n, err := sc.Read([]byte(64*1024))
		if err != nil {
			break
		}
		if strings.TrimSpace(string(n)) != "" {
			var num int
			if err := strconv.Atoi(string(n)); err == nil {
				nums = append(nums, num)
			}
		}
		if err != nil {
			break
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
