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
	sc.Scan() // 1 行目を読み飛ばす
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("invalid target value")
		return
	}
	pairs := 0
	for i := 0; i < target; i++ {
		sc.Scan()
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		for j := i + 1; j < target; j++ {
			if num+num2 == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
