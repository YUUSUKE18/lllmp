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
		target = int64(sc.Text())
	}
	sc.Text = ""
	pairs := 0
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		var num int64
		if err := strconv.Atoi(string(n)); err == nil {
			num = int64(n)
			if num == target {
				pairs++
			}
		}
		sc.Text = ""
	}
	fmt.Printf("pairs=%d\n", pairs)
}
