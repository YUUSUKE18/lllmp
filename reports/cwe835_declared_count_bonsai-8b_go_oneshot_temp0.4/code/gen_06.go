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
	var count int
	var sum int
	sc.Scan()
	if err != nil {
		fmt.Println("count=<0> sum=<0>")
		return
	}
	count, err = strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("count=<0> sum=<0>")
		return
	}
	sc.Scan()
	for {
		sc.Scan()
		if err != nil {
			if count == 0 {
				fmt.Println("count=<0> sum=<0>")
			} else {
				fmt.Printf("count=%d sum=%d\n", count, sum)
			}
			return
		}
		if err != nil {
			fmt.Println("count=<0> sum=<0>")
			return
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			fmt.Println("count=<0> sum=<0>")
			return
		}
		sum += n
		count--
		if count == 0 {
			fmt.Printf("count=%d sum=%d\n", count, sum)
			return
		}
	}
}
