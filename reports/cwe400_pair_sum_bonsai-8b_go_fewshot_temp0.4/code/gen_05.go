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
	if err := strconv.Atoi(sc.Text()); err != nil {
		fmt.Println("pairs=0")
		return
	}
	sc.Scan()
	pairs := 0
	var nums []int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			if n == 0 {
				break
			}
			break
		}
		for i := 0; i < n; i++ {
			if err := strconv.Atoi(buf[i]); err != nil {
				continue
			}
			nums = append(nums, buf[i] - '0')
		}
		if len(nums) < 2 {
			continue
		}
		for i := 0; i < len(nums); i++ {
			for j := i + 1; j < len(nums); j++ {
				if nums[i]+nums[j] == target {
					pairs++
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
