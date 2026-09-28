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
		fmt.Println("Invalid target value")
		return
	}

	pairs := 0
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		nums := strings.Fields(line)
		for i := 0; i < len(nums); i++ {
			for j := i + 1; j < len(nums); j++ {
				if strconv.Atoi(nums[i])+strconv.Atoi(nums[j]) == target {
					pairs++
				}
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
