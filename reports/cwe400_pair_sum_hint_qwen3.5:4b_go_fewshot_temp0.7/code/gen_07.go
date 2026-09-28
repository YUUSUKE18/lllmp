package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	target, err := strconv.ParseInt(r.ReadString('\n'), 10, 64)
	if err != nil || target < 0 {
		fmt.Printf("pairs=0\n")
		return
	}
	
	pairs := int64(0)
	count := make(map[int64]int64)
	
	for {
		line, _ := r.ReadBytes('\n')
		if len(line) == 0 {
			break
		}
		
		token := string(line)
		n, err := strconv.ParseInt(token, 10, 64)
		if err != nil || n < 0 {
			continue
		}
		
		needed := target - n
		if count[needed] > 0 {
			pairs += count[needed]
		}
		count[n]++
	}
	
	fmt.Printf("pairs=%d\n", pairs)
}

var _ = strconv.ParseInt // Ensure build succeeds even if unused in scope check
