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
	validCount := 0
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は許容
		}
		parts := strings.Split(line, ",")
		isValid := true
		for _, p := range parts {
			// 末尾のカンマを区別するため、最後の要素が空か空文字列のみで良いかチェック
			// しかし、問題文「末尾のカンマは許容します」は、例えば "1,2," のような場合を指す可能性あり
			// strings.Split("1,2,", ",") は ["1", "2", ""] を返す。最後の要素が空文字列の場合は無視するべきか？
			// 問題文「空白区切りの整数列」の例を見ると、通常は数値のみだが、末尾カンマを許容するため
			// "1,2," は妥当、「abc」や「 1, a」といったものは不十分と解釈します。
			// さらに「数字とカンマ以外を含む行は妥当ではありません」とあるので、各要素に非数値が含まれる場合は invalid

			if p == "" {
				continue // 末尾のカンマから生じる空要素は許容する（例: "1,2," -> parts[2]=""）
			}

			val, err := strconv.Atoi(p)
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
