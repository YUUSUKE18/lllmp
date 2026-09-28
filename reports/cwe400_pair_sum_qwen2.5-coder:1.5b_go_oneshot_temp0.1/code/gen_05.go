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
		fmt.Println("invalid target")
		return
	}
	sc.Scan()
	n, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid n")
		return
	}
	pairs := 0
	for i := 0; i < n; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		for j := i + 1; j < n; j++ {
			if num+nums[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
