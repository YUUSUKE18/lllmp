package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	var target int64
	if !scanner.Scan() {
		fmt.Printf("pairs=0\n")
		return
	}
	target, _ = scanner.Int64() // 目標値を読み取る

	type pair struct {
		sum   int64
		count int64
	}
	
	var pairs []pair
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		complement := target - val
		
		for i := len(pairs) - 1; i >= 0; i-- {
			p := pairs[i]
			if p.sum == complement {
				pairs[i].count += 2
			} else if p.sum < complement {
				pairs = append(pairs[:i+1], pair{sum: p.sum + val, count: 2})
			} else {
				break
			}
		}
	}
	
	if err := scanner.Err(); err != nil {
		fmt.Printf("pairs=0\n")
		return
	}
	
	count := int64(0)
	for _, p := range pairs {
		count += p.count
	}
	
	fmt.Printf("pairs=%d\n", count)
}
