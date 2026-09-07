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
		fmt.Println("invalid target value")
		return
	}

	pairs := 0
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		nums := strings.Fields(line)
		if len(nums) != 2 {
			fmt.Println("invalid input format")
			return
		}
		n1, err1 := strconv.Atoi(nums[0])
		n2, err2 := strconv.Atoi(nums[1])
		if err1 != nil || err2 != nil {
			fmt.Println("invalid input format")
			return
		}
		if n1+n2 == target {
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
