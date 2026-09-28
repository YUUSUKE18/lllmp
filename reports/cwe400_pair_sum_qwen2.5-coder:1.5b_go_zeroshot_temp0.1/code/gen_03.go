package main

import (
	"fmt"
	"sort"
)

func main() {
	var target int
	fmt.Scan(&target)

	var pairs int
	for i := 0; i < target; i++ {
		var num int
		fmt.Scan(&num)
		if num == 0 {
			continue
		}
		pairs += sort.SearchInts(sort.IntsSlice{num}, target-num) - 1
	}

	fmt.Println("pairs=", pairs)
}
