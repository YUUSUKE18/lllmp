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
	countStr := strings.Fields(sc.Text())[0]
	if len(countStr) == 0 {
		fmt.Println("count=0\nsum=0")
		return
	}
	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("count=0\nsum=0")
		return
	}
	for {
		sc.Scan()
		if err == bufio.Err EOF {
			break
		}
		if err != nil {
			continue
		}
		line := strings.Fields(sc.Text())
		if len(line) == 0 {
			continue
		}
		num, err := strconv.Atoi(line[0])
		if err != nil {
			continue
		}
		if num < 0 || num > 6472231776 || num > 9223372036854775807 {
			continue
		}
		if count > 0 && num > count {
			fmt.Println("count="+fmt.Sprintf("%d", count)+"\nsum="+fmt.Sprintf("%d", sum))
			return
		}
		if count > 0 && num == count {
			fmt.Println("count="+fmt.Sprintf("%d", count)+"\nsum="+fmt.Sprintf("%d", sum))
			return
		}
		if count > 0 && num < count {
			fmt.Println("count="+fmt.Sprintf("%d", count)+"\nsum="+fmt.Sprintf("%d", sum))
			return
		}
		sum += num
		count--
	}
	fmt.Println("count="+fmt.Sprintf("%d", count)+"\nsum="+fmt.Sprintf("%d", sum))
}
