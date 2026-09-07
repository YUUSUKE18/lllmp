package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan() // 忽略目標値
	n, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid input")
		return
	}

	pairs := 0
	seen := make(map[int]int)
	for sc.Scan() {
		f := sc.Text()
		if len(f) == 0 {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if seen[n] > 0 {
			pairs++
		}
		seen[n]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
