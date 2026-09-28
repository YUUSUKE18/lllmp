package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target := 0
	ignored := 0
	pairs := 0
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if strings.TrimSpace(n) == "" {
			ignored++
			continue
		}
		var num int64
		if err := strconv.ParseInt(n, 10, 64); err == nil {
			num = int64(num)
			if num == target {
				pairs++
			}
		}
		sc.Scan()
	}
	fmt.Printf("pairs=%d\n", pairs)
}
