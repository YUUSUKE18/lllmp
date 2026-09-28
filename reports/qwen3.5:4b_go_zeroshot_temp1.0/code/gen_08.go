package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(stdin)
	
	var nums []*big.Int
	
	// スキャンした各行を処理し、空行や非数値の要素をスキップしつつ整数のみを追加
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			
			n, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			v := big.NewInt(n)
			// 重複チェック（スライスに要素がないか確認）
			found := false
			for _, x := range nums {
				if x.Cmp(v) == 0 {
					found = true
					break
				}
			}
			if !found {
				nums = append(nums, v)
			}
		}
	}
	
	// 個数と合計を計算
	count := len(nums)
	sum := big.NewInt(0)
	for _, n := range nums {
		sum.Add(sum, n)
	}
	
	fmt.Printf("count=%d sum=%s\n", count, sum.String())
}
