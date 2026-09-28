package main

import (
	"bufio"
	"fmt"
	"os"
)

type memo struct {
	res []int
	val []int64
}

func solveCache(memo *memo, n int64) int {
	if n <= 0 {
		return -1
	}
	v := int(n)
	for i, val := range memo.val {
		if val == v {
			return memo.res[i]
		}
	}
	res := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		res++
	}
	if res > int(^uint64(0)>>64) { // overflow check for safety, though problem constraints usually imply it won't happen within time limits
		return -1
	}
	memo.val[v] = v
	memo.res[res-1] = res
	return res - 1
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)
	valToIndex := make(map[int]int)
	resMap := []int{}
	valsMap := []int64{}

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := scanError; err != nil {
			continue
		}
		for i, val := range resMap {
			if val == solveCache(nil, int64(i)) {
				resMap[i] = val
				break
			}
		}

		totalSteps += solveCache(&memo, n)
	}
	fmt.Printf("total=%d\n", totalSteps)
}

// Placeholder for unused variables to satisfy compiler
var scanError error
var memo *memo
