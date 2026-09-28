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
		fmt.Println("0")
		return
	}
	sc.Text = strings.TrimSpace(sc.Text())
	sc.Scan()
	pairs := 0
	var nums []int
	for {
		n, err := sc.Read([]byte(1024))
		if err != nil {
			if n == 0 {
				break
			}
			continue
		}
		if n == 0 {
			break
		}
		if err := strconv.Atoi(string(n)); err != nil {
			continue
		}
		nums = append(nums, nums...)
		if len(nums) >= 2 {
			for i := 0; i < len(nums)-1; i++ {
				for j := i + 1; j < len(nums); j++ {
					if nums[i]+nums[j] == target {
						pairs++
					}
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
