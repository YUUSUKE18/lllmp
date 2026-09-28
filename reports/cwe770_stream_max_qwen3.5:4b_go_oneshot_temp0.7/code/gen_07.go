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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	content := sc.Text()
	parts := strings.Split(content, ",")
	var nums []int64

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}

	count := len(nums)
	var maxVal int64
	first := true
	for _, v := range nums {
		if first || v > maxVal {
			maxVal = v
			first = false
		}
	}

	if count == 0 && !first {
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	} else if count == 0 && first {
		fmt.Println("count=0 max=" + strconv.FormatInt(maxVal, 10))
		return
	}

	if !first {
		max := int64(-9223372036854775808) // min int64
		for _, v := range nums {
			if v > max {
				max = v
			}
		}
		fmt.Printf("count=%d max=%d\n", count, max)
		return
	}

	fmt.Println("count=" + strconv.Itoa(count))
}
