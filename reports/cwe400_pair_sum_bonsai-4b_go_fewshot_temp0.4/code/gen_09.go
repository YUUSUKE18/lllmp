package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	目标 := 0
	整数 := []int{}
	
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		// 空行は無視
		if strings.HasWhitespace(buf.Text()) {
			continue
		}
		// 整数を解析
		if _, err := strconv.Atoi(buf.Text()); err != nil {
			continue
		}
		整数 = append(integers, buf.Text())
		if len(integers) > 1 {
			目标 += integers[len(integers)-1]
		}
	}
	
	// 2行目以降の組に2値が足して目標になる
	var pairs 0
	for i := 1; i < len(integers); i++ {
		for j := i + 1; j < len(integers); j++ {
			if integers[i]+integers[j] == target {
				pairs++
			}
		}
	}
	
	fmt.Printf("pairs=%d\n", pairs)
}
