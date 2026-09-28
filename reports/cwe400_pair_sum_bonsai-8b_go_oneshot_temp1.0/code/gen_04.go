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
	var target string
	sc.Scan(&target)
	sc.Scan()
	var sum int
	var count int
	var seen map[int]bool
	var nums []int
	for {
		sc.Scan()
		if !sc.Err() && sc.Scan() {
			if !strings.TrimSpace(sc.Text()) {
				continue
			}
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			nums = append(nums, n)
			sum += n
			if sum == int(target) {
				count++
				if len(seen) < 2 {
					seen[nums[0]] = true
					seen[nums[1]] = true
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
