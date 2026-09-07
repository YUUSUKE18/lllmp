package main

import (
	"fmt"
	"sort"
)

func main() {
	target := readInt()
	pairs := countPairs(target)
	fmt.Println("pairs=", pairs)
}

func readInt() int {
	var n int
	fmt.Scan(&n)
	return n
}

func countPairs(target int) int {
	pairs := 0
	arr := readIntArray()
	sort.Ints(arr)

	for i := 0; i < len(arr)-1; i++ {
		for j := i + 1; j < len(arr); j++ {
			sum := arr[i] + arr[j]
			if sum == target {
				pairs++
			}
		}
	}

	return pairs
}

func readIntArray() []int {
	var arr []int
	for {
		n, err := fmt.ScanInt(&arr)
		if err != nil {
			break
		}
	}
	return arr
}
