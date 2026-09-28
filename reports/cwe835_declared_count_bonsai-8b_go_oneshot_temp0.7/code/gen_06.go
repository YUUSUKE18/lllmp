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
	if err != nil {
		fmt.Println("count=<0> sum=<0>")
		return
	}
	for {
		sc.Scan()
		if err != nil {
			fmt.Println("count=<0> sum=<0>")
			return
		}
		if count == 0 {
			fmt.Println("count=<0> sum=<0>")
			return
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			fmt.Println("count=<0> sum=<0>")
			return
		}
		count++
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
