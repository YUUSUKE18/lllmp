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
		fmt.Println("Invalid target value.")
		return
	}

	var pairs int
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		nums := strings.Fields(line)
		for i := 0; i < len(nums); i++ {
			for j := i + 1; j < len(nums); j++ {
				if nums[i]+nums[j] == target {
					pairs++
				}
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
