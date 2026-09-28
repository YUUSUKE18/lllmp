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
	var count, sum int
	sc.Scan()
	count = 0
	for {
		sc.Scan()
		if !sc.Err() && !sc.Done() {
			break
		}
		if err := strconv.Atoi(sc.Text()); err == nil {
			count++
			sum += int64(err)
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
