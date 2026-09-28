package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var found bool

	for sc.Scan() {
		if !sc.Text().Trim() == "" {
			val, err := strconv.ParseInt(sc.Text(), 10, 64)
			if err != nil {
				continue
			}
			break
		}
	}

	if !found {
		fmt.Println("pairs=0")
		return
	}

	target = val

	count := 0
	sums := make(map[int64]bool)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := target - num
		if sums[complement] {
			count++
		}
		sums[num] = true
	}

	fmt.Printf("pairs=%d\n", count)
}
