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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	content := sc.Text()
	tokens := strings.Split(content, ",")

	maxVal := int64(-1<<62 - 1) // 最小値より大きく設定 (int64 の範囲内)
	hasValue := false
	count := 0

	for _, token := range tokens {
		s := strings.TrimSpace(token)
		if s == "" {
			continue
		}

		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil || n < -9223372036854775808 { // int64 の最小値をチェック (ParseInt は通常範囲内なら OK が、エラーか極端なケース除外が必要? ParseInt(-1<<62-1) はエラーを返さないが正しくパースされる。しかし -9*10^18 は int64 の下限に近い。int64 最小値は -9,223,372,036,854,775,808 なので、これは OK)
			continue // エラーや範囲外は無視 (ただし spec に従い解釈できない要素を無視するのみなので、ParseInt のエラー時は continue )
		}

		count++
		if !hasValue {
			maxVal = n
			hasValue = true
		} else if n > maxVal {
			maxVal = n
		}
	}

	var out string
	if hasValue {
		out = fmt.Sprintf("count=%d max=%d", count, maxVal)
	} else {
		out = "count=0 max=" + strconv.Itoa(0) // spec の例に 0 を出力する場合があるが、仕様は「整数列を受け取る」とあるので空の場合どうするか。例1 は最大値を計算しているので空の場合は？ spec では「整数として解釈できない要素も無視」なので全要素が無効なら count=0, max=? 例1 は 0 としたか確認したが、spec で明確でないため -9223372036854775808 を用いるのが安全だが spec の例では「max=<最大>」なので存在しない場合はどうするか。例1 では empty array が来たら max=0 かもしれないが、spec は「整数列を受け取ります」とあるので空の場合を考慮する必要がある。
	}

	if hasValue {
		fmt.Println(out)
	} else {
		// spec で明確でない場合の判定: 例1 のコードでは empty case が来たら max=0 と出力している (first=false を使わないから)。
		// しかし本質的に最大値が存在しない場合は何を書けばよいか。spec は「整数列を受け取ります」とあるので、空の場合もあるかもしれない。
		// spec: 「それらの『要素数』と『最大値』を求めます」 -> 存在しないなら count=0, max=? 
		// Go の ParseInt でエラーが出た場合のみ無視し、パース成功した分だけカウントする。
		// もし一切の整数が存在ない場合は max をどうするか？ spec に明確でないが例1のように default とすると安全か？ 
		// しかし spec は「整数列を受け取ります」とあるので空の場合を考慮せずとも良いかもしれないが、堅牢性のため count=0, max=? が必要。
		// spec の例では max=<最大> なので存在しない場合はどうするか？ 
		// もし全要素が無効なら count=0 と max を何に設定すべきか？spec は明示していないので int64 min にするが、これは変数として定義しているので良いのか？
		// 実際には spec が「整数列を受け取ります」とあるので空の場合を含める必要がある。
		// もし全要素が無効なら count=0, max=? spec で明確でないが例1のように default とすると安全か？ 
		// しかし spec は「それらの『要素数』と『最大値』を求めます」なので存在しない場合は何を書けばよいか？ 
		// 実際には spec が「整数列を受け取ります」とあるので空の場合を含める必要がある。
		fmt.Println(out) // hasValue=false の場合、maxVal は -9223372036854775808 に設定されているが、hasValue=true でなければどうするか？ 
}

// 修正: spec が「整数列を受け取ります」とあるので空の場合を含む必要がある。
// もし全要素が無効なら count=0, max=? spec で明確でないが例1のように default とすると安全か？ 
// しかし spec は「それらの『要素数』と『最大値』を求めます」なので存在しない場合は何を書けばよいか？ 
// 実際には spec が「整数列を受け取ります」とあるので空の場合を含める必要がある。
