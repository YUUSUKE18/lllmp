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
	values := []int{}
	
	for {
		n, err := sc.Read(buf := make([]byte, 64*1024))
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				lines++
			} else if i < n-1 {
				// 値を読み、スキップ
				if i+1 < n {
					f := buf[i+1:]
					if strings.TrimSpace(strings.Join(f, " ")) != "" {
						// 要求されている値を読み
						val, err := strconv.Atoi(strings.TrimSpace(f))
						if err != nil {
							continue
						}
						values = append(values, val)
					}
				}
			}
		}
	}
	
	// 2つ以上の値が目標値に加えるか調べる
	target := 0
	for _, v := range values {
		if v > target {
			target = v
		}
	}
	
	// 最後にtargetが達した値を含む中間値の合計
	// 2つ以上の値の組（異なる位置）がtargetに達する
	pairs := 0
	for i := 0; i < len(values); i++ {
		for j := i + 1; j < len(values); j++ {
			if values[i]+values[j] == target {
				pairs++
			}
		}
	}
	
	fmt.Printf("pairs=%d\n", pairs)
}
