package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var target int
	fmt.Scanln(&target)

	sc := bufio.NewScanner(os.Stdin)
	var pairs, sum int
	for sc.Scan() {
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		sum += num
		if sum == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
