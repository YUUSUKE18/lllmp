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
	target, err := strconv.ParseInt(sc.Text(), 10, 64)
	if err != nil {
		fmt.Println("invalid target value")
		return
	}
	count := 0
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		pairs := make([]string, 0)
		for _, f := range strings.Fields(line) {
			n, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			if n == target {
				count++
			} else if target-n > 0 {
				pairs = append(pairs, fmt.Sprintf("%d,%d", n, target-n))
			}
		}
		if len(pairs) == 2 {
			count++
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
