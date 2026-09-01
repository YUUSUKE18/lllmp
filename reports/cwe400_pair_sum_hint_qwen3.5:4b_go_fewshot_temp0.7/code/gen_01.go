package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	lineNum := 0

	for sc.Scan() {
		lineNum++
		if lineNum == 1 {
			s, _ := sc.Text(), ok
			if !ok {
				break
			}
			fmt.Sscanf(s, "%d", &target)
			continue
		}

		token := sc.Text()
		var val int64
		fmt.Sscanf(token, "%d", &val)

		if token == "" || val < 0 {
			continue
		}

		for i := target; i > val; i-- {
			if v, ok := seen[int64(i)]; ok {
				count++
				break
			}
		}

		seen[val] = struct{}{}
	}

	fmt.Printf("pairs=%d\n", count)
}

var seen map[int64]struct{}
var count int64

func init() {
	seen = make(map[int64]struct{})
	count = 0
}
