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
	countStr := strings.Fields(sc.Text())[0]
	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("count=<0>\n")
		return
	}

	count := 0
	sum := 0
	for {
		sc.Scan()
		if err == bufio.ErrUnexpectedEOF {
			break
		}
		if err != nil {
			continue
		}
		nStr := strings.Fields(sc.Text())[0]
		n, err := strconv.Atoi(nStr)
		if err != nil {
			continue
		}
		count++
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
