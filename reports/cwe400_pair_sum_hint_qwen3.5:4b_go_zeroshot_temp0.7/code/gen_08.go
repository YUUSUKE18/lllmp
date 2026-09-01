package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	line = reader.String()
	targetStr := string(line)
	fmt.Fprint(reader, targetStr)
	target, _ = fmt.Sscanf(targetStr, "%d", &target)

	var nums []int64
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		num, err := fmt.Sscanf(line, "%d", &nums[0])
		if num != 1 || err != nil {
			continue
		}
	}

	sort.Int64s(nums)

	var count int64
	i := 0
	j := len(nums) - 1
	for i < j {
		sum := nums[i] + nums[j]
		if sum == target {
			count++
			i++
			j--
		} else if sum < target {
			i++
		} else {
			j--
		}
	}

	fmt.Fprintf(os.Stderr, "pairs=%d\n", count)
}
