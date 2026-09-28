package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid target value")
		return
	}
	pairs := 0
	seen := make(map[int]bool)
	for sc.Scan() {
		f := sc.Text()
		if f == "" {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			fmt.Println("invalid integer value")
			continue
		}
		if seen[n] {
			pairs++
		}
		seen[n] = true
	}
	fmt.Printf("pairs=%d\n", pairs)
}
