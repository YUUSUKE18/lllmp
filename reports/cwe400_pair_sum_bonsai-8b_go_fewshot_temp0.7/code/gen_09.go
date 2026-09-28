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
	if sc.Text() == "" {
		fmt.Println("pairs=0")
		return
	}
	target := 0
	if err := strconv.Atoi(strings.TrimSpace(sc.Text())); err != nil {
		fmt.Println("pairs=0")
		return
	}
	sc.Scan() // skip the first line
	pairs := 0
	var nums []int
	for {
		n, err := sc.Read([]byte(64 * 1024))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		if buf := string(n); strings.TrimSpace(buf) != "" {
			num, err := strconv.Atoi(buf)
			if err != nil {
				continue
			}
			nums = append(nums, num)
		}
	}
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
