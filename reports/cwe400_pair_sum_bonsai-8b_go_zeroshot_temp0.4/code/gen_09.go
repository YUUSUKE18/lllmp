package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target string
	var numbers []int

	// 第1行から目標値を読み込む
	fmt.Scanln(os.Stdin, &target)
	if err := strconv.Atoi(target); err != nil {
		fmt.Println("0")
		return
	}

	// 前後の行を読み込む
	for {
		if !strings.TrimSpace(r := readLine()) {
			break
		}
		if r == "" {
			continue
		}
		if err := strconv.Atoi(r); err != nil {
			continue
		}
		numbers = append(numbers, r)
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if i != j && numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}

func readLine() string {
	r := bufio.NewReader(os.Stdin)
	return r.ReadString('\n')
}
