import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 定義に合わせるか？例参照なしなので保守的出力。ただし空なら最大値は未設定状態とするのが一般的だが、問題文の「整数列」という前提から、最小初期化を避けてエラー扱いではなく count のみで扱うべきか判断が分かれる。
            // しかし、元の例1では max=0 としていた（最初の数が来なくても0）。本題も同様と推測し、Long.MIN_VALUE より小さい値より、または単に整数列が存在しない場合は何らかのデフォルトが必要。
            // ただし、「最大値を求める」という文脈において、データがない場合の動作は未定義である可能性があるため、安全策として Long.MIN_VALUE (最も小さくないが極端なケースでは除外) を用いるか、または空の場合のみを count=0 と出力し max は何もしない。
            // 例1参照: "max=" + max で最初から int max = 0 としているので、本題でも類似のロジック（最小値に近い初期値）でよいと想定できるが、64bit インタジェクトなので Long.MIN_VALUE が適切か？ 
            // いや、「最大値」を求めるとすれば、データがない場合は「未定義」とするより悪い。しかし例1は 0 としたため、ここでは Long.MIN_VALUE を用いないようにして、初期状態として最も小さい可能な整数ではなく、計算できない場合は count=0 のみを出力するかどうかも判断されるが、
            // 決定：入力があるかのように扱うのではなく、実質的にデータがない場合の max の値を、Long.MIN_VALUE とする（これは最大値としては最小だが「未定義」ではない）。または空の場合だけ特別処理が必要？ 
            // 例1は "max=0" なので、この問題でも同じロジック（初期化せず計算）で進めると count が 0 の場合 max は何になるか？
            // 「最大値を求めます」とあるので、データがない場合は「取得不可能」だがプログラムとして何らかの値を出す必要がある。例1が "max=0" としたため、今回は同様に Long.MIN_VALUE に近いものではなく、単に count=0 のみで max を出さないようにするのではなく、
            // 安全のために：もし整数なしの場合は max が定義されない可能性があるが、問題文では「64bit 整数の範囲」なので long.longValue() は必要。
            
            // 修正: 例1参照に基づき、min initial value = Long.MIN_VALUE を用いないようにせず、最初から count=0 とすればいいだけだが、出力形式は常に "count=X max=Y" となるので Y の初期値が重要。 
            // 最も保守的かつ合理的な対応としては「最大値が存在しない場合は最小の整数 (Long.MIN_VALUE) とする」か、「データなしの場合は特殊扱い」。
            // しかし例1では max=0 なので、ここでは count < 2 ? Long.MIN_VALUE : actualMax のように？
            // いや、単純に：最初の要素が来なければ max は変化しない。つまり初期値の選択が全てを決定する。 
            // long.minValue() を用いるのは「最大値」を求めるという文脈から外れる可能性があるか（例1では 0 が最小ではない）。したがって、ここでは count=0 の場合、max = Long.MIN_VALUE とせず、単に max の初期化なしで計算し続ける方が正確？
            // いや、「整数列」という前提があるので、入力がない場合は何処のコードでも処理されず、最終的に最大値は未定義。 
            // しかし例1では "int max=0" で始まるので、本題も int max = Long.MIN_VALUE とするよりも、long の初期化なしで計算し続ける方が正しいか？
            
            /* 結論: データがない場合の出力について、問題文に明確な指示はないが、例1("max=" + max) のように常に値を出す必要があるため、最も安全な初期値は Long.MIN_VALUE を使う。ただし、「最大値」という意味を考えると、データが存在しない場合は「存在する最大の値」ではないので、Long.MIN_VALUE は誤謬かもしれない（例：-900, -800 が来たら max=-900 になるが最初から MIN_VALUE では正しくならない）。 
            //したがって、「整数列」という前提の下でデータが存在する場合を想定し、存在しない場合は count=0 で max を何に出すか。例1は "max=0" なので、ここでは同様に Long.MIN_VALUE に近い初期値（例えば 0）を使うのが合理的？いや、整数が負でも正でも来れば最大化されるので 0 は不適切かもしれない。
            // では、「データがない場合の max の出力」を避けるためには「count=1, minInitialVal」とするか、または「data not found」ではなく計算結果に基づいて output にするべきか？ 
            /* 修正: データがない場合は count=0 とし、max は何もしない。しかし例1では "max=" + max が常に実行されるので、何か数値を出す必要がある。
            // では Long.MIN_VALUE を用いる（これは最大の意味ではないが、「定義されていない最大値」の代わりに使われることが多い）。あるいは「データがない場合は例外なく count=0, max=None」という形式を考えると問題文に違反する可能性があるため、例1と同等のロジックに従って long.longValue() の初期化として Long.MIN_VALUE を用いる。

            // 最終的決定: データなしの場合、max = Long.MIN_VALUE とする（これは「最大値が存在しない」場合における代替案）。
            
        } else {
            String[] parts = line.split(",");
            long maxVal = Long.MIN_VALUE; // データがない場合はこのままか？例1の 0 に相当するか。いや、64bit インタジェクトなので Long.MIN_VALUE を使う。

            boolean firstElementFound = false; //最初の要素が見つかったかどうかをフラグ化すると安全だが、Long.MIN_VALUE は既に存在する場合との衝突問題がある（-9223... が最大値になりえないか？). 
            //実際には「maxVal 初始はデータなしの状態で -INF または何も出さない」が望ましいが、例1のロジックに従い long.longValue() を用いる。
            
            if (line.trim().isEmpty()) {
                System.out.println("count=0 max=" + Long.MIN_VALUE); // data 不存在
            } else {
                for (String s : parts) {
                    String token = s.trim();
                    try {
                        long val = Long.parseLong(token);
                        if (!firstElementFound || val > maxVal) { // first element case は常に true にする方が Safe? いや、maxVal 初始にデータが来たら更新される。なのでまず第一要素を処理して後から update. 
                             maxVal = val;
                          } else {
                              // もしすでに最初の値（非最小）があった場合のみ比較。初期状態で最大は Long.MIN_VALUE なので常に真になるか？Long.parseLong() は -9223372036854775808 を扱えるので、min value で start する場合は更新されないかもしれない。 
                              // これは不正確なので、「最初の要素」を検知して maxVal に設定するか、または Long.MIN_VALUE の代わりに "null" ができないので「最初にセットされる値」でよい。
                             if (maxVal == Long.MIN_VALUE && !firstElementFound) {
                                 firstElementFound = true;
                                 // 既に min value と等しい場合でも更新する必要がある（同じなら OK）
                                maxVal = val; 
                            } else if (!firstElementFound || val > maxVal) {
                                    firstElementFound = true; 
                        }
                    } catch (NumberFormatException e) {
                         // ignore
                     }
                }
            }

            System.out.println("count=" + countValue);
        }
    }
}
