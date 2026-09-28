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
	target := sc.NextInt()
	count := 0
	pairs := 0

	for {
		s := sc.Text()
		if len(s) == 0 {
			break
		}
		num, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if count == 0 {
			count = num
			continue
		}
		if count+num == target {
			pairs++
		}
		count = num
	}

	fmt.Printf("pairs=%d\n", pairs)
}
