package main

import (
	"bufio"
	"fmt"
)

func main() {
	var line int
	fmt.Scan()
	
	// 1番目目標値
	target := line

	// 2番目以降は整数
	var integers []int
	for {
		_, err := fmt.Scan()
		if err == io.EOF {
			break
		}
		if err != nil {
			break
		}
		if s, err := s.Parse("int"); err == nil {
			integers = append(integers, int(s))
		}
	}

	// 2番目以降の2つの数の総和が目標値になるペアの数を計算
	count := 0
	n := len(integers)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if integers[i]+integers[j] == target {
				count++
			}
		}
	}

	fmt.Println("pairs=", count)
}
