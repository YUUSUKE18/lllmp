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
		fmt.Printf("count=0 max=\n") // 空のリストの場合、最大値は未定義ですが例1と合わせるかゼロとする。例1ではmax=0。今回は同様にするのが妥当だが、問題文「整数列を読み」なので少なくとも1個以上あることを前提していない場合、空の場合はどうするか。
		return
	}

	count := 0
	maxVal := int64(0) // 仮の最大値としてゼロ開始（負数がある場合は初期化が必要）。通常は最初の要素をmaxにするのが安全だが、入力が整数なしならエラーになる可能性が低いと想定？問題文「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」なので、解析中に失敗する要素は跳び越える。
	// 最大値の初期化を考慮：もし全要素が無効な場合どうするか？例1では max=0 と出力しているため同様の挙動とする（最初の有効な数で更新するか）。
	// より安全な実装: first flag を使って、最初にvalid integerが見つかればそれをmaxにする。

	first := true

	for _, f := range strings.Split(sc.Text(), ",") {
		w := strings.TrimSpace(f)
		if w == "" {
			continue // 空要素スキップ
		}
		n, err := strconv.ParseInt(w, 10, 64)
		if err != nil {
			continue // 整数として解釈できないものも無視
		}

		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
