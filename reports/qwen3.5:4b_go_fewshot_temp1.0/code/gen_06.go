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

	var nums []int64
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}

	count := int64(0)
	sum := int64(0)
	for _, num := range nums {
		count++
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
