package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err1 := strconv.ParseInt(sc.Text(), 10, 64)
	if err1 != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	lines := sc.NumLines()
	nums := []int64{}
	
	for i := 1; i < lines; i++ {
		line, isPrefix := sc.Scan()
		if !isPrefix {
			continue
		}
		str := string(line)
		if str == "" {
			continue
		}
		
		for _, c := range str {
			if c >= '0' && c <= '9' || c == '-' {
				v, err := strconv.ParseInt(string([]rune{c}), 10, 64)
				if err != nil {
					continue
				}
				nums = append(nums, v)
			}
		}
	}

	count := 0
	seen := make(map[int64]bool)
	
	for _, n := range nums {
		m := target - n
		if seen[m] {
			count++
		}
		seen[n] = true
	}

	fmt.Printf("pairs=%d\n", count)
}
