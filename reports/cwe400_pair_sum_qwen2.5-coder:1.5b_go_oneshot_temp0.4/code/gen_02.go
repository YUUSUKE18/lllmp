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
		fmt.Println("invalid target value")
		return
	}
	sc.Scan()
	sc.Scan()
	var pairs int
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
