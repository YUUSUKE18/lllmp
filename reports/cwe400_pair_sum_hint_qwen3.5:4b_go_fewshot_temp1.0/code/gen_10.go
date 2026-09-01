package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	reader := bufio.NewReader(sc)

	var target int64
	for sc.Scan() {
		line, _ := reader.ReadString('\n')
		line = line[:len(line)-1] // remove trailing newline
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		break
	}

	var nums []int64
	for sc.Scan() {
		line, _ := reader.ReadString('\n')
		line = line[:len(line)-1]
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, val)
	}

	target = nums[0] // target is the first number in the input line
	var pairs int

	counts := make(map[int]int)
	sortedNums := make([]int64, len(nums))
	copy(sortedNums, nums)

	sort.Slice(sortedNums, func(i, j int) bool {
		return sortedNums[i] < sortedNums[j]
	})

	i := 0
	j := len(sortedNums) - 1
	for i < j {
		sum := sortedNums[i] + sortedNums[j]
		if sum == target {
			if counts[sortedNums[i]] >= 2 || (counts[sortedNums[i]] == 1 && counts[sortedNums[j]] >= 1) {
				counts[sortedNums[i]]++
				pairs += counts[sortedNums[i]] * counts[sortedNums[j]]
			} else {
				counts[sortedNums[i]]++
			}
			j--
			i++
		} else if sum < target {
			i++
		} else {
			j--
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
