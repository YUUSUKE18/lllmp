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
	var target, pairs int
	sc.Scan()
	if err != nil {
		fmt.Println("0")
		return
	}
	if _, err := strconv.Atoi(sc.Text()); err != nil {
		fmt.Println("0")
		return
	}
	target = target

	sc.Scan()
	// ターゲット値が0の場合、0組を出力
	if target == 0 {
		fmt.Println("0")
		return
	}

	var numbers []int
	for {
		sc.Scan()
		if err != nil {
			if len(numbers) < 2 {
				fmt.Println("0")
				return
			}
			// 数値が0か、変換失敗か、または空行の後に無視
			if len(numbers) >= 2 {
				if len(numbers) >= 2 && numbers[len(numbers)-1] == 0 {
					fmt.Println("0")
					return
				}
				if len(numbers) >= 2 {
					n := numbers[len(numbers)-1]
					if n == 0 {
						fmt.Println("0")
						return
					}
					if n <= target {
						// 超えている値を無視
						if len(numbers) >= 2 {
							pairs++
						}
					}
				}
			}
		// 空行の後に無視
		if sc.Text() == "" {
			break
		}
	}

	fmt.Println("pairs=" + fmt.Sprintf("%d", pairs))
}
