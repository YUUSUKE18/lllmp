package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	line := sc.Text()

	var nums []int64
	for _, numStr := range strings.Fields(line) {
		v, err := strconv.ParseInt(numStr, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, v)
	}

	sort.Slice(nums, func(i, j int) bool { return nums[i] < nums[j] })

	var countMap map[int64]int64
	countMap = make(map[int64]int64)
	for _, n := range nums {
		countMap[n]++
	}

	uniqueNums := 0
	sumVal := int64(0)
	for n, c := range countMap {
		uniqueNums++
		sumVal += int64(c * float64(n)) // cast to int64 for multiplication safety in case of overflow issues during sort logic if needed, but int64*int64 is fine here
	}

	fmt.Printf("count=%d sum=%d\n", uniqueNums, sumVal)
}
