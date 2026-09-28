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
	var sum int64
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
	sc.Flush()
	for {
		sc.Scan()
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println("invalid input")
			return
		}
		var num string
		sc.Scan(&num)
		if num == "" {
			break
		}
		if err := strconv.Atoi(num); err != nil {
			continue
		}
		sum += num
		count++
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
