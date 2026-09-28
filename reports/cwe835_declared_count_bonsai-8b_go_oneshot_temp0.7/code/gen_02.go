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
		fmt.Println("invalid input")
		return
	}
	count, err = strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid count")
		return
	}
	sc.Text = ""
	for { ; } {
		sc.Scan()
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}
		var n int
		if _, err := strconv.Atoi(sc.Text()); err != nil {
			sc.Text = ""
			continue
		}
		sum += n
		sc.Text = ""
		count++
	}
	if count == 0 {
		fmt.Println("0 0")
		return
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
