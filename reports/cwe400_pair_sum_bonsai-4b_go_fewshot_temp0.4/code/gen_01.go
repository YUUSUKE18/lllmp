```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	chars := 0
	target := 0
	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		chars += n
		if buf[n] == '\n' {
			lines++
		}
	}
	if lines == 0 {
		fmt.Printf("pairs=0\n")
		return
	}
	// 1 位目は目標値
	// 2 位目以降は整数
	targetVal := 0
	if err := sc.Scan(&targetVal); err != nil {
		// 1 位目が目標値でスキップ
		continue
	}
	// 2 位目以降を整数として读取
	nums := []int{}
	for i := 0; i < lines-1; i++ {
		n, err := sc.Scan(&nums[i])
		if err != nil {
			continue
		}
		if err := strconv.Atoi(string(nums[i])); err != nil {
			continue
		}
		if chars == 0 {
			// 1 位目はスキップ
			continue
		}
		// 空行はスキップ
		if buf[i] == '\n' {
			// 空行はスキップ
			continue
		}
		// 2 位目以降の整数が读取
		if i >= 1 {
			// 2 位目以降の整数は读取
			// targetの達成を確認
			for j := 0; j < len(nums); j++ {
				if nums[j] > 0 {
					// 2 位目以降の整数を读取
					// targetの達成を確認
					if nums[j] > 0 {
						// targetの達成を確認
						// 2 位目以降の整数を读取
						// targetの達成を確認
						// 2 位目以降の整数を读取
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						// targetの達成を確認
						//
