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
	var count int
	var sum int

	if err := strconv.Atoi(countStr); err != nil {
		fmt.Println("count=0")
		return
	}

	count = count

	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err != nil {
			continue
		}
		sum += sc.Text()
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
