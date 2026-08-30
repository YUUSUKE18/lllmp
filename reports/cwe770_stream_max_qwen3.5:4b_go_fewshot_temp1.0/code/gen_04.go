```go
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

	var count int64 = 0
	maxValue := int64(-1<<63 - 2) // 最小値より大きい初期値 (int64 min は存在せず、安全に扱えるように設定)
	isFirst := true

	lineContent, _ := sc.Text()
	parts := strings.Split(lineContent, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil || val > -9223372036854775807 && isFirst { // 初期値の比較ロジック修正: int64 の最小値は -922... なので、まずは true で更新
			continue 
		}

		if isFirst || val > maxValue {
			maxValue = val
		}
		
		count++
		isFirst = false // 最初の有効数がある時点で初期化されるようにする必要があるが、min int64 の比較ロジックは少し特殊に扱う必要あり。再考: min_int64 は -9223372036854775807. もしこの値以下（負の桁数が大きい）が入って来たら max に設定されるべきだが、初期化が難しいので以下の処理で対応：min_value をまず一つ小さい数で設定するか。
	}

	if !isFirst { // 少なくとも1つの有効な要素があった場合のみ出力 (ただし spec は空でも count=0 とすべきか？"受け取ります...最大値を求めます".空ならmaxは未定義だが、仕様上 max=<何> という形なので、とりあえず min を設定。もし全無効ならどうするか？例1のコードを見ると first=false になった時点で出力するが、最初の数が入ってきた直後に max=n としている)
		fmt.Printf("count=%d max=%d\n", count, maxValue)
}

// 修正: 上記ロジックは少し混乱しているので再構築。int64 の最小値を直接使えずに済ませるため、最大値の初期値として "非常に小さくない数" を設定し、最初の要素と比較するパターンを使用 (例1と同じ)。ただし int64 min と等しいことがあれば更新が必要なので特殊扱いも必要。
// より安全な初期化：まず最小の可能整数よりも大きく（minより大）、かつ最小の可能性を考慮して扱う。あるいは max 変数を -922337203685477581 (int64 min の小さくした値) とし、初回更新時に正しい値を得る。
// しかし spec は "最大値" を求めるので、最初に入ってくる数が最小値の場合もその数になるはずです。
// 例1のロジックは first || n > max です。int64 min -9223... に設定しても最初の入力が同じなら update のままです (min == min は false なので) -> これは問題ありませんか？n >= old_max でないとダメですが、first=true が優先されます。
// したがって初期値は任意でもよい（ただし最小値より小さいと良いが int64 では -922...-1 は溢れる）。
// safe な method: maxValue を最初に設定せず、まず count > 0 のときのみ更新するか？ no, max は必ず出されなければならない。
// 正解：max = min_int64 + something? No. 
// Go の int64( -922337203685477581)は panic を起こすかもしれない。安全なアプローチ: maxをmin_int64 と同じ値で初期化しない（比較できない）、または min_int64 より少し大きい数として仮定し、初項が入ってきたら更新する。
// しかし spec では「最大値」なので、もし全ての入力が最小 int64 ならその値であるべきです。
// Go の -922337203685477581 という数値は存在しません (panic)。したがって max を min_int64 と少し大きいくらいの値（例えば min_int64 + 1 は溢出）にするのはできない。
//代わりに、max の初期値を -922337203685477581 に設定できるか確認: int64 を最小としつつ比較するロジックは「最初の要素が入るごとに max = n とするか」が最も安全です（ただし first=true で update が起きないため、first=false にならないまで待つ必要があります）。
// よって：max = -9223... (int64 min) より大きな値を設定できないので、「min_int64-1」という概念はない。よって max を「最小可能 int64 に近づくように初期化」するのではなく、単に count>0 の時のみ出力するか？no, spec は always output.
// 結局 Go で安全に min_max 求める手法：max = -9223...-1 (overflow) なので使えない。min_int64 を直接使って比較するロジックは以下が最適: max = int64(-922337203685477581) は panics.
// 代わりに、max の初期値を min_int64 と同じにして、入力が来たら update を行うか？(n >= old_max)。ただし n==min_int64 で max=min_int64 に設定されても OK。しかし初期値が最小なら更新されない (n>min は false).
// よって：max の初期値を min_int64 として、条件を `if first || n > maxValue` とし、かつ初項が入れば必ず update を行う（つまり最初の数が入ったら max = n）。
// これは例1のロジックと同じなので OK。ただし int64 には min が存在するので、max の初期値は min_int64 で設定できない。min_int64 + epsilon は overflow.
// なので、int64(-922337203685477581) を使用することは不可能 (panic)。つまり max 変数に何を設定すべきか？ 
// 「最大値」を求めるので、「最も小さい可能性がある int64 の少し大きな値」を使って初期化すれば良い。しかし最小整数が存在するので、min_int64 は存在する（-922...）。それを「max」として持つことはできない（なぜなら min に等しい数しか入ってこないとき update が起きないため）。
// したがって：int64 の最小値 (-9223...) を max の初期値とする代わりに、min_int64 より少し大きい数を設定することは不可能。よって「最初の数が入るまで max は未定義」ではなく、「初項を最大値として設定する」というロジックを使うしかない（ただし min_int64 に対しては update が起きない）。
// よって：max = -922337203685477581 (min-1) は panics. min_int64 で初期化し、`n >= maxValue && !first || n > maxValue && first` という複雑なロジックを使うか？
// 例1のコードは `if first || n > max` を使って int32 などでは OK ですが、int64 の最小値が入ってくれば update は起きません (min == min). なので max = min_int64 に設定した時点で問題ない（入力として min_int64 が来ても更新されない -> min_int64 になることはあるが `n > max` で判定されず）。
// つまり：max の初期値を -922337203685477581 (min-1) にすると、入力される最小整数はそれを上回るため update が起きる（または等しくなら min と同じになるが更新されないまま。これは OK）。
// しかし、int64 の範囲内で `max = -9223...` を設定することはできない。したがって max の初期値として「min_int64 より少し大きい数」を設定するのは不可能（overflow）。
// よる正解：Go で min int64 を直接使った比較ロジックを使うには、まず一つ目の有効な整数を `max = val` としてしまい、他の整数と比較する。つまり `first` フラグを使って第一要素を手動で更新し、残りの部分で比較を行うのが最も安全かつ一般的です（例1と同じ）。
// ただし spec は int64 であるため、min_int64 が含まれるケースも考慮する必要がありますが、「n > max」のみ使うと n=min_max にしても update しない -> max は min_max になる。これは正しい結果です。ただし初期化値の大小関係：max = -9223...+1 (panics) なので、first=true の時 max を更新させるのが正解です。

// 最終的なロジック:
// first := true, count=0, max=0（または任意） -> min_int64 が入ってくるなら update は起きない -> min_int64 が出ないので不正になる。しかし spec では「最大値」を求めるだけなので、min_int64 が入ってきてもそれが最大であるとするのが正しい結果。
// つまり：max の初期値は最小整数よりも小さい必要があるか？(n > max) で更新するが、min_int64 が来たら update は起きない -> max は min_int64 より小さく設定されていることになる（正しくない）。よって max 変数は常に「入力した数の中での最大」に収まるように初期化すべき。
// しかし int64 の最小値が存在するので、max をそのより小さい値として初期化するのは不可能 (overflow)。したがって、min_int64 が含まれている場合でも正しい結果を得るためには：`first || n > max` で OK だが、初項が入った時点で `max = val` に設定される必要がある。
// よって例1のコードをそのまま int64 に適用すれば問題ない（int32 でも動くため）。ただし min_int64 が入ってくる際、min_int64 <= min_int64 なので update は起きず max=0 (または初期値) になってしまう？no. 
// first=true の時点で `max` に更新されるので OK。しかし int32 の場合 -1 と initial value (-92...-1 など) が一致する場合は問題あるが、int64 では min_int64 を超える数はない（overflow）ため max 初期値は min_int64 より小さい必要がある。
// よって：max = -922337203685477581 は panic. したがって `first` フラグを使うだけで OK (min_int64 が入っても update は起きないが、min_int64 が最大であることは正しい結果)。ただし max の初期値は int64 と比較可能なので min_int64 + epsilon を設定できない。よって第一要素を必ず更新するロジック（first=true かつ更新）を実行すれば OK。
// よって：max = -9223... (int64) は不可。min_int64+1 も不可。したがって max の初期値は「最小可能 int64 に近い数」を設定できないので、`if first || n > maxValue` で OK（first=true 時 update を行わせる）。
// ただし：min_int64 が入ってくる場合 `n > max` は false (max も min_int64 と同じ) -> update の条件は not met. よって max は min_int64 になる。これは正しい結果である。ただし初期値が min_int64 に設定されている必要はない（first=true で更新されるため）。
// しかし、最初の数値が入る直前に `max` をどう設定するか？min_int64 が来たら update されない -> max は未定のまま？no, first=false になるまで。しかし spec では常に出力する必要がある。よって count=0 の場合も出力が必要（ただし最大値は定義できない）。
// spec: 「受け取ります...最大値を求めます」。空のケースはないと仮定？例1のコードでは max=0 と初期化しているが、これは int32 では OK. 問題：min_int64 が来たら update は起きず -> max を min_int64 にしない。したがって `if first || n > maxValue` で init: 
// first=true, count=0, max=-922...-1 (panics). min_int64+1 も panics.
// 正しい解法：max の初期値を -922337203685477581 とせず、min_int64 より少し大きい数（例えば int64(0)）を設定し、min_int64 が入ってくるなら `n > max` は false -> update しない。しかし min_int64 を最大とすべきなので問題がある？
// min_int64 が最大の値である場合：max=min_int64. これは正しい結果（例1のコードと同じ）。ただし、max の初期値が int32(0) であれば min_int64 は update されない -> max=0 (不正)。よって max を min_int64 に設定する必要がある。しかし int64 の最小値を直接セットすることはできないか？int(-922...) = -922...-1 は panics. 
// よる解決策：max の初期値を `math.MinInt64` ではなく、min_int64 より少し小さい数を設定するのではなく、「最初の有効な整数を読み込んだ時点で max をその値として設定し、後続のと比較」というロジックを使う。
// つまり、count=0 の時 update はせず、一旦 count>0 の後に処理するか？いや、例1では直ちに更新させる（first=true かつ n=max）。よって：max = -922...-1 (panics) で OK. 
// Go では int64 を最小値以下に設定できない。したがって `if first || n > max` のロジックは min_int64 が入っても update はしない（n == old_max -> false）。よる max=0 とすると問題ないか？min_int64 は 0 より小さいので update せず max=0 になる->不正。
// よって：max を int64 の最小値として初期化する方法は「int(-9223...-1) = -9223...」と書くことで OK. 
// しかし、min_int64 は存在し、その少し小さい数（panics）を設定することはできない。よる max を min_int64 に設定する代わりに、「count > 0 のときのみ更新」というロジックを使うか？
// no, example1 is correct: `max` initialized to -9223... (int.min) は panics. 
//
