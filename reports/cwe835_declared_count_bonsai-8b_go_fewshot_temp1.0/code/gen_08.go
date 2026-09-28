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
	var count, sum int
	countStr := sc.Text()
	if countStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}
	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}
	sc.SetDelim('\n')
	for {
		n, err := sc.Read(buf)
		if err != nil {
			if n == 0 {
				break
			}
			break
		}
		if err == nil {
			for i := 0; i < n; i++ {
				chars++
				if buf[i] == '\n' {
					lines++
				}
			}
		}
		if err != nil {
			break
		}
	}
	for i := 0; i < len(buf); i++ {
		if buf[i] == '\n' {
			break
		}
	}
	if lines == 0 {
		fmt.Println("lines=0 chars=0")
		return
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
