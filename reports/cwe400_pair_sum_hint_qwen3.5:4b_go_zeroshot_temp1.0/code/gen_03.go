package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}
	fmt.Sscanf(line, "%d", &target)

	hash := make(map[int64]int64) // 値 -> 出現回数 (または累積和の差分として利用)
	var pairs int64
	var currentSum int64

	for {
		line, err := reader.ReadString('\n')
		if line == "" {
			break
		}
		if err != nil {
			break
		}
		if line == "\n" {
			continue // 空行無視
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err != nil {
			continue // 整数として解釈できない行無視
		}

		// hash に格納されている値の累積和から、(currentSum - v) が target になるような v の数を足し込む
		if acc, exists := hash[val]; exists {
			// val を持つ n 個あるが、そのうち m 個の組み合わせを形成可能であるとする
			pairs += currentSum * int64(n) // 擬似コードでは実際の配列要素の数を使っている
			// 修正：実際の実装では、現在の累積和 (currentSum) を用いて、
			// 過去の値の総和から currentSum を引いたものが target になるような previous_sum の数を加える。
			// しかし、単純に各 val を持つ個数を数え上げるのではなく、
			// 次のアルゴリズムを使う: 
			// 累積和の差分法: hash[v] に v を持つ個数を格納する (または出現回数)。
			// pairs += hash[target - currentSum] * count_of_current_val
			pairs += hash[val] // ここでは、target = v1 + v2 => v1 = target - v2
			currentSum += val
		}

		hash[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
