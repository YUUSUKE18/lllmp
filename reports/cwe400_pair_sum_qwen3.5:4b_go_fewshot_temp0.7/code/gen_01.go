package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if sc.Scan() {
		s, err := strconv.ParseInt(sc.Text(), 10, 64)
		if err != nil || s == 0 { // 目標値が 0 の場合は、空の組を返すのが一般的だが、仕様は「整数として解釈できない行も無視」なので、エラーが発生した場合のみスキップ。ただし、目標値自体が 0 であることは問題ない。
			continue
		}
		target = s
	} else {
		fmt.Println("pairs=0")
		return
	}

	var count int64
	var nums []int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}

	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			sum := nums[i] + nums[j]
			if sum == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
