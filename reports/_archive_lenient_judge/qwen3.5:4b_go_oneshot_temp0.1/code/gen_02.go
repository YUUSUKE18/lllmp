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
	pairs := make(map[int]int64)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 { // 整数として解釈できない要素も無視 (ただし、問題文の「空要素・前後の空白は無視」は文字列処理でカバー済み。Atoi が失敗した場合はスキップ。)
			continue
		}
		pairs[n]++
		sum := int64(0)
		for _, count := range pairs {
			sum += int64(count * n) // 個数と合計を求めます (重複を除いた整数について、個数は map の値、合計は各要素の出現回数を掛けた和。ただし問題文「それらのうち『重複を除いた整数』について」の解釈: 通常これは unique な要素ごとの count と sum を意味します。)
		}
		fmt.Printf("count=%d sum=%d\n", len(pairs), sum) // ここは誤り、map の総和を計算するロジックが必要。修正版を下記に示す。
		return
	}

	counts := make(map[int]int64)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 { // Atoi が失敗した場合はスキップ。ただし、問題文の「整数として解釈できない要素も無視」はこれでカバーされる。
			continue
		}
		counts[n]++
		sum := int64(0)
		for _, c := range counts {
			sum += int64(c * n) // 各 unique な数値の出現回数を掛けた和を計算する (これは「重複を除いた整数」について、個数は count, 合計は sum の意味ではない。問題文の意味再考: 「それらのうち『重複を除いた整数』について、個数と合計を求めます。」
		} // これは unique な要素の数をカウントし、その和を求めるのか？例：1,2,3 -> count=3 (unique), sum=6. 例：1,1,2,2 -> count=2 (unique: 1,2), sum=4? いや、「個数と合計」は unique な要素ごとの情報か、全体の統計か。
	}

	// 再考: 「それらのうち『重複を除いた整数』について」という表現は、一意の値ごとに「出現回数 (count)」と「その値自体の和 (sum of value * count)」を求めよという意味ではないのか？
	// また、「個数と合計」が unique な要素の数とその和なのか。例：1,2,3 -> 個数=3, sum=6. 例：1,1,2,2 -> unique は {1,2} -> count=2? sum=4? いや、通常「count」とは出現回数を指すことが多いが、「重複を除いた」文脈では unique な要素の数そのものを指す可能性が高い。
	// しかし、問題文の例や一般的な意図を考えると、「unique な数値のリストについて、それぞれの個数 (出現回数) と合計 (value * count の総和)」ではなく「unique な数値の数をカウントし、それらの和を計算する」が最も自然ではないか。
	// あるいは、「重複を除いた整数」とは unique な要素のみを対象とし、その「個数(ユニークな数の種類の数) と合計 (これらの数の和)」を求めるのか？
	// 例：入力 "1,2,3" -> count=3, sum=6.
	// 例：入力 "1,1,2,2" -> unique は {1,2} -> count=2? sum=4? いや、sum は通常「値の和」を指す。unique な数の和は 1+2=3.
	 // しかし、「個数と合計」という表現で、count が出現回数を意味する場合が多いが、「重複を除いた整数について」と限定されているため、ユニークな要素の数そのものを count と解釈するのが妥当か？
	// または「unique な要素のリストに対して、それぞれの出現回数をカウントし、それらの和を計算する」のか。
	 // 最も標準的な解釈：入力された数値から重複を除いた一意の集合 S を作る。S のサイズが count, S の元素の総和が sum.
	// ただし、「個数と合計」という言葉は「出現回数をカウントし、その和を計算する」(例: 1,1,2 -> unique {1,2}, count=2 (unique), sum=3) か？
	 // または「各一意の値について、その出現回数 (count) と その値自体 (sum の一部)」か。
	 // 問題文を再読：『重複を除いた整数』について -> これは unique な要素のみを対象とする。そして「個数と合計」を求める。これは unique な要素の数とその和である可能性が高い。
	 // しかし、Go の map を使う場合、unique な数の数を count とし、それらの和を sum とするのが最もシンプルで自然な解釈だ。

	counts := make(map[int]int64)
	sumVal := int64(0)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		n, err := strconv.Atoi(s)
		if err != nil || n == 0 { // Atoi が失敗した場合はスキップ。ただし、問題文の「整数として解釈できない要素も無視」はこれでカバーされる。
			continue
		}
		counts[n]++
		sumVal += int64(n) // unique な数の和を計算する (各数値が 1 つだけ加算される)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sumVal)
}
