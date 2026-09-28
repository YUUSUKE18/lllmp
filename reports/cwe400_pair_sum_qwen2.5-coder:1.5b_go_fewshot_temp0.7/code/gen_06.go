package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	sc := bufio.NewScanner(r)
	target := 0
	sc.Scan()
	target, _ = strconv.Atoi(sc.Text())
	lines := 0
	pairs := 0
	for {
		n, err := r.ReadBytes('\n')
		if err != nil {
			break
		}
		for i := 0; i < len(n); i++ {
			if n[i] >= '0' && n[i] <= '9' {
				num, _ := strconv.Atoi(string(n[i:]))
				if num != target {
					pairs++
				}
			}
		}
		lines++
	}
	fmt.Printf("pairs=%d\n", pairs)
}
