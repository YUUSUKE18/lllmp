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
	sc.Scan() // 1行目：目標値
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		return
	}
	var pairs int
	sc.Scan() // 2行目：空行
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		nums := strings.Fields(line)
		if len(nums) < 2 {
			continue
		}
		for i := 0; i < len(nums)-1; i++ {
			for j := i + 1; j < len(nums); j++ {
				sum := strconv.Atoi(nums[i]) + strconv.Atoi(nums[j])
				if sum == target {
					pairs++
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
