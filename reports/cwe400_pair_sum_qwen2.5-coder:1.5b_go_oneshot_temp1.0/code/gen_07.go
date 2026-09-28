package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan() // 目標値を読み取る
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("目標値が不正です。")
		return
	}

	n := 0
	for {
		sc.Scan() // 次の整数を読み取る
		if sc.Text() == "" {
			break
		}
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			fmt.Println("整数が不正です。")
			return
		}
		n++
	}

	if n < 2 {
		fmt.Println("整数が不足しています。")
		return
	}

	pairs := 0
	for i := 0; i < n-1; i++ {
		for j := i + 1; j < n; j++ {
			if num[i]+num[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
