package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan() // ターゲット値を読み取る
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("エラー: ターゲット値が不正です")
		return
	}

	pairs := 0

	for sc.Scan() {
		f := strings.Fields(sc.Text())
		if len(f) != 2 {
			fmt.Println("エラー: 各行に2つの整数が含まれていません")
			return
		}
		n1, err1 := strconv.Atoi(f[0])
		n2, err2 := strconv.Atoi(f[1])
		if err1 != nil || err2 != nil {
			fmt.Println("エラー: 各整数が不正です")
			return
		}
		if n1+n2 == target {
			pairs++
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
