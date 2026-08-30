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
		if len(s) == 0 {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}

	mapped := make(map[int64]int64)
	var sum int64
	for _, num := range nums {
		count, exists := mapped[num]
		if !exists {
			count = 1
		} else {
			count++
		}
		mapped[num] = count
		sum += num * int64(count)
	}

	var result string
	for num, count := range mapped {
		result += fmt.Sprintf("count=%d sum=%d\n", count, num*int64(count))
	}

	fmt.Print(result)
}
