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
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}
	pairs := 0
	for {
		sc.Scan()
		if sc.Text() == "" {
			break
		}
		a, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		for _, b := range []int{a, a - target, a + target} {
			if b != a && b >= 0 {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
