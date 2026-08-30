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
	input := sc.Text()
	lines := strings.Split(input, "\n")
	var nums []int
	for _, line := range lines {
		fields := strings.Fields(line)
		for _, f := range fields {
			n, err := strconv.Atoi(f)
			if err == nil {
				nums = append(nums, n)
			}
		}
	}
	if len(nums) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}
	maps := make(map[int]int)
	sum := 0
	for _, n := range nums {
		count := maps[n]
		sum += n * count
		maps[n] = count + 1
	}
	var result int
	for _, count := range maps {
		result += count
	}
	fmt.Printf("count=%d sum=%d\n", result, sum)
}
