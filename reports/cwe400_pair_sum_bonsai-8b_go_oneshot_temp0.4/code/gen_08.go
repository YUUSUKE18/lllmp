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
	target := 0
	first := true
	pairs := 0
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			target, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			first = false
		} else {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			for i := 0; i < pairs; i++ {
				if target == n {
					pairs++
					break
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
