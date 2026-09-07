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
	sc.Scan() // 1 行目目だけ読み込む
	target, err := strconv.Atoi(sc.Text()) // 目標値を取得
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}
	count := 0

	sc.Scan() // 2 行目目だけ読み込む
	sc.Scan() // 3 行目以降の整数を読み込む
	for i := 0; i < sc.TotalLines(); i++ {
		sc.Scan()
		n, err := strconv.Atoi(sc.Text()) // 整数を取得
		if err != nil {
			continue
		}
		if i == 0 && target != n {
			count++ // 目標値と異なる整数を最初の位置に追加
		} else if target == n {
			count++ // 目標値と等しい整数を追加
		} else if count == 1 {
			fmt.Printf("pairs=%d\n", count)
			return
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
