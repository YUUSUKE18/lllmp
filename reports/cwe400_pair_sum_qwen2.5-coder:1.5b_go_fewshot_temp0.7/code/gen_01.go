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
	for {
		sc.Scan()
		if sc.Text() == "" {
			break
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n < target {
			continue
		}
		for i := 0; i < len(nums); i++ {
			if i == j {
				continue
			}
			if nums[i]+nums[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
