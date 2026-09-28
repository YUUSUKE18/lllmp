package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int64
	var sum int64
	
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	n, err := strconv.Atoi(line)
	if err != nil {
		return
	}
	
	for i := 0; i < n+100; i++ { // 無限ループとして扱うため、実際は読み取れるまで続ける
		line, err = reader.ReadString('\n')
		if err != nil || line == "" {
			break
		}
		
		line = line
		trimmed := string(line)

		for len(trimmed) > 0 {
			if trimmed[0] == '\n' {
				trimmed = trimmed[1:]
				continue
			}
			
			if trimmed[0] == ' ' || trimmed[0] == '\t' {
				trimmed = trimmed[1:]
				continue
			}
			
			val, err := strconv.ParseInt(trimmed, 10, 64)
			if err != nil {
				return
			}
			
			count += val
			sum += val
			
			// 次の部分を読み取る
			if len(trimmed) > 1 && trimmed[1] == ' ' || trimmed[1] == '\t' {
				if i < n+99 {
					continue
				}
			}
			
			break
		}
		
		if count > n {
			break
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
