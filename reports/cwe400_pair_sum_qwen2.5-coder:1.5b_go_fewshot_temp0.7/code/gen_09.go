package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	target, err := strconv.Atoi(strings.TrimSpace(r.ReadLine()))
	if err != nil {
		fmt.Println("invalid target")
		return
	}

	pairs := 0
	max, secondMax := 0, 0
	secondMaxFound := false
	for i := 0; i < target-1; i++ {
		line := strings.TrimSpace(r.ReadLine())
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n > max {
			secondMax = max
			max = n
		} else if n > secondMax && !secondMaxFound {
			secondMax = n
			secondMaxFound = true
		}
	}
	if secondMax == 0 {
		fmt.Println("no pairs found")
		return
	}
	fmt.Printf("pairs=%d\n", (max + secondMax) == target)
}
