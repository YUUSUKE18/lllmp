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
	if !sc.Scan() {
		fmt.Printf("count=0 max=\n")
		return
	}
	
	lines := strings.Split(sc.Text(), "\n")
	var nums []int64
	
	for _, line := range lines {
		fields := strings.Fields(line)
		for _, f := range fields {
			n, err := strconv.ParseInt(f, 10, 64)
			if err != nil || n == 0 && len(strings.TrimSpace(f)) > 0 { // Integers can be negative too, but we check if the string is non-empty and not a valid int representation initially? No, ParseInt handles negatives. The requirement says "integers". So just parse it.
				// Actually, if f contains something that isn't an integer (like 'abc'), ParseInt returns error and we ignore.
				continue 
			} else {
				nums = append(nums, n)
			}
		}
	}

	if len(nums) == 0 {
		fmt.Printf("count=0 max=\n")
		return
	}

	maxVal := nums[0]
	for _, v := range nums[1:] {
		if v > maxVal {
			maxVal = v
		}
	}
	
	count := len(nums)
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
