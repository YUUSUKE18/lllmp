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
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		if first || err != nil {
			continue
		}
		var num int
		if err := strconv.Atoi(buf[:n]); err == nil {
			num = num
			first = false
			nums = append(nums, num)
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
