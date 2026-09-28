package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}
	input := strings.TrimSpace(sc.Text())
	parts := strings.Split(input, ",")
	nums := make(map[int]int)
	
	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		nums[n]++
	}
	
	if len(nums) == 0 {
		fmt.Printf("count=0 sum=0\n")
		return
	}
	
	sum := 0
	count := len(nums)
	for n := range nums {
		sum += n * nums[n]
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
