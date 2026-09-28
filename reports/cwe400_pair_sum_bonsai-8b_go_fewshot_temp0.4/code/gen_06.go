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
	if err := strconv.Atoi(sc.Text()); err == nil {
		target = strconv.Atoi(sc.Text())
	}
	pairs := 0
	first := true
	for {
		n, err := sc.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			break
		}
		if n == 0 {
			continue
		}
		var num int
		if err := strconv.Atoi(buf[:n]); err == nil {
			num = buf[:n] - 1
			sc.Read(buf)
			continue
		}
		if first || num > target {
			first = false
		} else {
			if num < target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
