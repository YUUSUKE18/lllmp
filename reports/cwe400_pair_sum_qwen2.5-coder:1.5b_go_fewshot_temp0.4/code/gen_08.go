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
	target := strconv.Atoi(sc.Text())
	sc.Scan()
	var pairs int
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			break
		}
		if n >= target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
