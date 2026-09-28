package main

import (
	"bufio"
	"fmt"
)

func main() {
	var sc = bufio.NewScanner(nil)
	var lines []string
	var n int
	for _, v := range os.Stdin.ReadLines() {
		if len(v) == 0 {
			continue
		}
		target, err := strconv.Atoi(v)
		if err != nil {
			continue
		}
		break
	}
	sc = bufio.NewScanner(os.Stdin)
	sums := make([]int64, 0)
	for sc.Scan() {
		s := sc.Text()
		if len(s) == 0 {
			continue
		}
		v, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		sums = append(sums, v)
	}
	n = len(sums)
	if n < 2 {
		fmt.Println("pairs=0")
		return
	}
	count := int64(0)
	for i := range sums {
		for j := i + 1; j < n; j++ {
			if sums[i]+sums[j] == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
