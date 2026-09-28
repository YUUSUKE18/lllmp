package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target, _ := strconv.ParseInt(sc.Text(), 10, 64)

	var pairs int
	var seen map[int]bool

	for i := 0; i < target; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if _, ok := seen[num]; !ok {
			seen[num] = true
		} else {
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
