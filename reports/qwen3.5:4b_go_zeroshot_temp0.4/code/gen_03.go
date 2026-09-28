package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader bufio.NewScanner(os.Stdin)
	var nums []int64
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		for _, part := range parts {
			num, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			nums = append(nums, num)
		}
	}

	set := make(map[int64]bool)
	sum := int64(0)
	for _, n := range nums {
		if !set[n] {
			set[n] = true
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(set), sum)
}
