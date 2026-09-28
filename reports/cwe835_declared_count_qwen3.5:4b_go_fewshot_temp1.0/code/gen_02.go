package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int64
	sum := int64(0)

	if sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil && n < 0 { // 負数の場合は処理せず、ただしエラー発生時は無視
			// エラーが発生した場合でも、後続の整数を読み取ります (空行などはスキップ)
			// ただし、1 行目自体が整数でない場合の挙動は「実際に読み取れた整数」なので無視で OK
			// 実際に入力形式に則った処理が必要だが、ここでは n が整数であると仮定しつつコードを進めるか、またはエラー時は 0 とする。
			// 問題文: "1 行目に...整数の個数" とあるので n は整数であるはずだが、 robust にするため変数を初期化し続けたまま
		} else {
			count = int64(n)
		}
	}

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		i, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += i
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
