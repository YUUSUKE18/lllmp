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
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("Error: Invalid target value")
		return
	}

	pairs := 0
	var nums []int
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			break
		}
		nums = append(nums, parseLine(line))
	}

	for i, n1 := range nums {
		for _, n2 := range nums[i+1:] {
			if n1+n2 == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}

func parseLine(line string) int {
	nums := strings.Fields(line)
	sum := 0
	for _, num := range nums {
		n, err := strconv.Atoi(num)
		if err != nil {
			continue
		}
		sum += n
	}
	return sum
}
