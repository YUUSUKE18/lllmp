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
		n, err := sc.ReadBytes(64 * 1024)
		if err != nil {
			break
		}
		sc.SetDelimiter("")
		parts := strings.FieldsN(n, " ")
		if len(parts) == 0 {
			sc.SetDelimiter(",")
			continue
		}
		if len(parts) > 1 {
			sc.SetDelimiter(",")
			continue
		}
		num, err := strconv.Atoi(parts[0])
		if err != nil {
			sc.SetDelimiter(",")
			continue
		}
		if num == target {
			nums = append(nums, num)
		}
		sc.SetDelimiter(",")
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
