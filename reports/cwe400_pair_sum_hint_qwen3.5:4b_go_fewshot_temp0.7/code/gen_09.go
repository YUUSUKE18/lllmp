package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines, chars := 0, 0
	var target int64
	var nums []int64
	
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		
		lines++
		chars += len(line)
		
		if lines == 1 {
			str, err := strconv.ParseInt(line, 0, 64)
			if err != nil || str < 0 {
				continue
			}
			target = str
		} else {
			str, err := strconv.ParseInt(line, 0, 64)
			if err != nil {
				continue
			}
			nums = append(nums, str)
		}
	}
	
	if len(nums) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}
	
	count := 0
	twoSumMap := make(map[int64]int)
	
	for i, num1 := range nums {
		diff := target - num1
		if count, ok := twoSumMap[diff]; ok {
			count += int64(count)
		}
		twoSumMap[num1] = 1
	}
	
	fmt.Printf("pairs=%d\n", count)
}
