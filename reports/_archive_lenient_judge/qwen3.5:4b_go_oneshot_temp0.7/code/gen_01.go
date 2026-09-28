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

	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ。キーは整数、値は (count, sum)。ただし、仕様では「重複を除いた整数」について、「個数」と「合計」を求めるため、同じ数字が複数回現れた場合、その出現回数が count となり、それらの和が sum となる解釈が必要か？
	// しかし、「重複を除いた整数」という表現は通常、ユニークな要素のみを指します。しかし、「個数と合計を求めます」の文脈から、入力されたデータセットに対して、各異なる数字について「その出現回数を count」「それらの和を sum」として出力することを想定するのが自然です。
	// 例えば入力が "1, 2, 3" の場合 -> count: (1->1), (2->1), (3->1) ; sum: (1->1+?, no). 
	// もう一度読み返す：『重複を除いた整数』について、個数と合計を求めます。
	// これは少し曖昧ですが、一般的に「ユニークな要素の出現回数を count として、その値の和を sum」と解釈するのが妥当です。ただし、「重複を除く」は結果セットに対して行うのか？それとも入力を処理して重複を除去するか？
	// 「重複を除いた整数について...個数と合計を求める」→ ユニークな数字ごとに「その出現回数を count」「それらの和（同じ数字のすべて）を sum」とするのが最も合理的です。
	
	// 修正：マップで各キー (int) に値として struct {count, sum} を保持するか、あるいは単純に count は出現回数、sum はその数字単独での合計（つまり key * value_count = total_sum? いや。）
	// 例えば "1, 2, 3" -> [1: cnt=1, sum=1], [2: cnt=1, sum=2], [3: cnt=1, sum=3]
	// "1, 1, 2" -> [1: cnt=2, sum=1+1=2], [2: cnt=1, sum=2]
	
	type Pair struct {
		Cnt int64
		Sum int64
	}

	for _, part := range parts {
		part = strings.TrimSpace(part) // 前後の空白を除去する（ただし、split が空文字列を生んだ場合は処理すべきか？仕様：「空白・無効は無視」）
		
		if part == "" { // 空要素は無視
			continue 
		}

		val, err := strconv.Atoi(part)
		if err != nil { // 整数として解釈できない要素も無視
			continue
		}

		counts[val] = Pair{Cnt: counts[val].Cnt + 1, Sum: counts[val].Sum + int64(val)}
	}

	fmt.Printf("count=") 
	for v := range counts { // マップのキー順は保証されないが、出力形式には順序指定なしなので OK。ただし、安定した順序（例：昇順）が良いかもしれないが必須ではない。
		
		fmt.Print(v, " ") // ここでは簡易的に「count=val sum=...」とするのではなく、「key=count val=sum」とするか？
		// 待てよ。「個数と合計を求めます」。出力形式は `count=<個数> sum=<合計>` 
		// これは、入力されたデータ全体の統計（unique count, unique sum）なのか？それとも各ユニーク要素ごとの情報か？
		// 「重複を除いた整数」について... -> 対象が「重複除去後のリストのそれぞれの元素」。つまりユニークな数字ごとに情報を出力。
		
		fmt.Printf("%d", counts[v].Cnt) 
	} // 上記のループでは、キー順で出力する必要があるか？または単一の統計値か？
	
	// もう一度読み解く：「それらのうち『重複を除いた整数』について」→ これらは複数の数字を指す。それぞれについて情報を求める。
	// しかし、例1は最大値 1 つしか出さない。「個数と合計」という表現が各要素ごとの場合は複数行になるはずだが、「厳密に 1 行だけ出力する」とある。
	→ よって、これは「重複を除いた整数の総計」ではなく、「ユニークな数字の数 (count) と その和を求める（sum）」という解釈が必要か？
	
	// もう一つの可能性：『重複を除いた整数』＝入力のリストから重複を取り除いた新しいリスト。その新リストに対して、要素数（count）と合計（sum）を求める。
	// 例："1, 2, 3" -> [1, 2, 3] -> count=3, sum=6. 
	// "1, 1, 2" -> [1, 2] -> count=2, sum=3.
	
	// これは最もシンプルで、「1 行だけ出力」という制約も満たし、文脈的にも整合する。
	
	var uniqueValues []int64
	for v := range counts { // key を取得
		uniqueValues = append(uniqueValues, v)
	}
	count := int64(len(uniqueValues))
	sum := 0 
	for _, val := range uniqueValues {
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
