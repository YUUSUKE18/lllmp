package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid target")
		return
	}

	pairs := 0
	for sc.Scan() {
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if num == target {
			continue
		}
		for i := 0; i < len(nums); i++ {
			if nums[i]+num == target {
				pairs++
				break
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
