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
	if !sc.Scan() {
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (値: int -> count+sum)
	sumTotal := int64(0)         // 全体の合計

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[val]++ // 個数をカウント (重複を除くため、同じ値は追加されるが、問題文の「重複を除いた整数」について個数と合計を求めます」という表現から、通常の意味での「一意な要素の数」と「それらの和」を求めていると考えられます。ただし、「重複を除いた整数」の定義により、各一意な整数に対して 1 つだけカウントし、その値に一致する元の出現回数を足すのか、単に一意な数自体の個数を求めるのか曖昧です。
		// 再考: 「『重複を除いた整数』について、個数と合計を求めます」
		// これは「一意になった後のリストに対して」という意味で解釈するのが自然です。
		// つまり、「1,2,3,1,4」の場合 -> [1,2,3,4] となり、count=4, sum=10 です。
	}

	for val := range counts {
		sumTotal += int64(val) // 一意な整数の和を計算 (int に変換して加算するため、元の値が負の場合でも OK)
		counts[val] = 1        // 「重複を除いた」という条件により、各数に対してカウントは 1 とみなす。あるいは「個数」という言葉から出現回数を足している可能性もありますが、「重複を除いた整数の集合」に対する操作と解釈するのが最も一般的です。しかし、例文や一般的なアルゴリズム問題では「一意な要素の数 (count)」と「それらの和(sum)」が求められます。
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sumTotal)
}
