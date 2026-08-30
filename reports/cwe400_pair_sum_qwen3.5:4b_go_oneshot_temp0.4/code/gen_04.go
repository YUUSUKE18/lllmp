package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if sc.Scan() {
		line, _ := sc.Text()
		fmt.Sscanf(line, "%d", &target)
	} else {
		return
	}

	count := 0
	sum := int64(0)

	for sc.Scan() {
		line, _ := sc.Text()
		if line == "" {
			continue
		}
		fmt.Sscanf(line, "%d", &sum)
		diff := target - sum
		if diff > 0 && diff != sum {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
