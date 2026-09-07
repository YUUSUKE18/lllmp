package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var goal int64
	sc.Scan()
	goal, err = strconv.ParseInt(sc.Text(), 10, 64)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}
	cnt := 0
	buf := make([]byte, 64*1024)
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n+goal == goal {
			cnt++
		}
	}
	fmt.Printf("pairs=%d\n", cnt)
}
