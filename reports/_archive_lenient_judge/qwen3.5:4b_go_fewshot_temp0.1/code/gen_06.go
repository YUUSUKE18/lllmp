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
	totalCount := int64(0)       // 重複を除いた全体の個数
	sumTotal := int64(0)         // 重複を除いた全体の合計

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		
		counts[n] = int64(1) // 重複を除くため、各整数はカウントに 1 を加える (または単純に存在するかどうかで判定し、後から合計を足す方が効率的だが、仕様は「個数と合計」なので、一意の値の数え上げが必要。
	}

	// 修正: マップキーが重複を除いた整数そのものではなく、各整数に対してカウントを増やす必要があるか？
	// 「重複を除いた整数について」という表現から、「ユニークな整数のリスト」を想定している可能性が高い。
	// その場合、個数 = ユニークな数の総数、合計 = 全てのユニークな数の和になるはずだが、通常「重複を除く」はセット操作。
	// しかし、もし入力に [1, 2, 3] があれば count=3 sum=6. 
	// もし入力に [1, 1, 2] があれば、「重複を除いた整数」というのは {1, 2} なので count=2, sum=3 か？
	// または、元のリストから重複を除外した後のリストの長さと和か？
	// 「重複を除いた整数」＝ユニークな数。その「個数」(count) と「合計」(sum)。
	
	uniqueInts := make(map[int]bool) // 一意に存在する整数のみ保持
	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}
		
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		
		uniqueInts[n] = true // 重複を除去する (set のような挙動)
	}

	count := int64(len(uniqueInts))
	sumTotal = 0
	
	for n := range uniqueInts {
		sumTotal += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sumTotal)
}
