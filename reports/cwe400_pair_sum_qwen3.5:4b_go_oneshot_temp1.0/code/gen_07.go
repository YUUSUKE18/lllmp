```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func twoSumPairsCount(target int64, nums []int64) int64 {
	count := 0
	markerMap := make(map[int64]int64)
	for i, num := range nums {
		comp := target - num
		if val, ok := markerMap[comp]; ok {
			count += val
		}
		markerMap[num]++
	}
	return count
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok {
			continue
		}
		trimmed := strings.TrimSpace(text)
		if trimmed == "" {
			continue
		}
		var err error
		switch idx {
		case 0:
			target, err := strconv.ParseInt(trimmed, 10, 64)
			if err != nil {
				continue
			}
			targets = append(targets, target)
		default:
			nums, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
			if err != nil {
				continue
			}
			targets = append(targets, nums)
		}
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums, _ := readIntsFromLine()
		counts[i] = twoSumPairsCount(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func readIntsFromLine() []int64 {
	var result []int64
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		text := sc.Text()
		num, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err == nil {
			result = append(result, num)
		}
	}
	return result
}

func twoSumPairsCountTwoSum(target int64, nums []int64) int64 {
	count := 0
	markerMap := make(map[int64]int64)
	for i, num := range nums {
		comp := target - num
		if val, ok := markerMap[comp]; ok {
			count += val
		}
		markerMap[num]++
	}
	return count
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainFinal() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func twoSumPairsCountTwoSum(target int64, nums []int64) int64 {
	count := 0
	markerMap := make(map[int64]int64)
	for i, num := range nums {
		comp := target - num
		if val, ok := markerMap[comp]; ok {
			count += val
		}
		markerMap[num]++
	}
	return count
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainComplete() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
	for s.Scan() {
		var num int64
		text := s.Text()
		if strings.TrimSpace(text) == "" {
			continue
		}
		n, err := strconv.ParseInt(strings.TrimSpace(text), 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}
	return nums
}

func mainCorrect() {
	sc := bufio.NewScanner(os.Stdin)
	idx := 0
	targets := []int64{}
	lines := []string{}
	for sc.Scan() && idx < 2 {
		text, ok := sc.Text()
		if !ok || text == "" {
			continue
		}
		targets = append(targets, parseTarget(text))
		idx++
	}

	counts := make([]int64, len(targets))
	for i, target := range targets {
		nums := parseNumbers(sc)
		counts[i] = twoSumPairsCountTwoSum(target, nums)
	}

	fmt.Printf("pairs=%d\n", counts[len(counts)-1])
}

func parseTarget(text string) int64 {
	var target int64
	scan := bufio.NewScanner(os.Stdin)
	if !scan.Scan() {
		return 0
	}
	target, _ = strconv.ParseInt(scan.Text(), 10, 64)
	return target
}

func parseNumbers(s *bufio.Scanner) []int64 {
	nums := make([]int64, 0)
