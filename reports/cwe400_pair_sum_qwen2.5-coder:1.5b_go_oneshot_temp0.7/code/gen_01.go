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
		return
	}
	var pairs int
	for sc.Scan() {
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		nums := strings.Fields(line)
		if len(nums) != 2 {
			continue
		}
		a, b, err := strconv.Atoi(nums[0]), strconv.Atoi(nums[1])
		if err != nil {
			continue
		}
		if a+b == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
