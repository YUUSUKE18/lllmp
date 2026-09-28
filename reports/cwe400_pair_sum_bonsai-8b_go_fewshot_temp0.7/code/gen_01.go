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
	ignored := 0
	numPairs := 0
	nums := []int{}
	for {
		n, err := sc.Read([]byte{1})
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		s := string(n)
		if s == "" {
			continue
		}
		if _, err := strconv.Atoi(s); err == nil {
			nums = append(nums, int(s))
		}
	}
	if len(nums) < 2 {
		fmt.Println("pairs=0")
		return
	}
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				numPairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", numPairs)
}
