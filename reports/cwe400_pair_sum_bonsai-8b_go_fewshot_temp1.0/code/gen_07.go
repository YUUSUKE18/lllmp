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
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				sc.Shunt(buf[i:])
				break
			}
		}
		if first || buf[i] == '\n' {
			continue
		}
		if _, err := strconv.Atoi(buf[i]); err != nil {
			continue
		}
		if first {
			target = buf[i]
			first = false
		} else {
			if target != 0 && buf[i] != 0 {
				pairs += 1
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
