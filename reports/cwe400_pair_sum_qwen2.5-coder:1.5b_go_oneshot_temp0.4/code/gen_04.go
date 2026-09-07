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
		fmt.Println("Error: Invalid target value.")
		return
	}

	pairs := 0
	sc.Scan()
	first := true
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > target {
			if target-n >= target/2 {
				pairs++
			}
			first = false
		} else if n < target {
			if target-n >= target/2 {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
