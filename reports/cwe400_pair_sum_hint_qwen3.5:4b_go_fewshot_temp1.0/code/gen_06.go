package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target, firstNum int64 = 0, 0
	
	// 1 行目に目標値を読み込む
	if sc.Scan() {
		fmt.Scanf("%d", &target)
	} else {
		os.Exit(1)
	}

	seen := make(map[int64]int64)
	pairs := int64(0)

	for sc.Scan() {
		var num int64
		_, err := fmt.Scanf("%d", &num)
		if err != nil || num == 0 {
			continue
		}

		if complement, ok := seen[target-num]; ok {
			pairs += complement
			seen[num]++
		} else {
			seen[num] = 1
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
