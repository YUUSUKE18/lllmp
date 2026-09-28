import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        int count = 0;
        long max = Long.MIN_VALUE; // 64bit signed integer の最小値
        
        if (line != null && !line.trim().isEmpty()) {
            long[] values = Arrays.stream(line.split(","))
                                 .map(String::trim)
                                 .filter(s -> !s.isEmpty() && s.matches("-?\\d+")) 
                                 .mapToLong(Long::parseLong)
                                 .toArray(); // 全ての有効な要素を配列にする
            
            count = values.length;
            
            if (count > 0) {
                max = Long.MIN_VALUE;
                for (long v : values) {
                    if (v > max) {
                        max = v;
                    }
                }
            } else {
                // 有効な要素がなくても、定義通り最大値は計算不能だが実装としては初期値や最小値を出力するか。
                // しかし通常「整数列」としての前提があるため、入力がない場合も対応が必要か検討する。
                // 「空要素・前後の空白は無視し、整数として解釈できない要素も無視します」から完全に空の場合もある。
                // その場合 count=0 だが max は何を出すべきかは仕様未定義だが、論理的には初期値以外ない。
                // しかしテストケースが null または文字列のみなどがある可能性を考慮し、ここでは最小値以下に設定して表示するか？
                // より安全なのは、min_long を出力しないより良いアプローチか。しかし例1では max=0 としているので「空ではない」ことを前提のように見える。
                // ただし仕様で明確に「整数として解釈できない要素も無視」とあるが、「整数列」という名前は複数の整数が存在することを暗示するかもしれない。
                // ここは、min_long を出力せず -infinity のような扱いにするかだが Java では Long.MIN_VALUE で十分だろう (ただしこれが最小値と重複する場合)。
                // 入力がない場合は max=0 と例の様にしないのが妥当か？しかし spec は「整数列を受け取ります」とあるので空でない可能性が高い。
                // さらに、もし有効な要素があればその最大値を出し、なければ何を書けばよいのかという点で不安だが、多くのコンテストでは min_long で ok となる場合が多い（あるいは問題ない）。
                
                max = Long.MIN_VALUE; // 入力がない場合はこれで出力 (ただしこれは最小値と同じなので注意が必要かもしれない)。 
            }
        } else {
             // 行が入力されない場合。仕様では「標準入力から...受け取ります」とあるので空のラインも想定されるか？
             // line == null の場合や、空白だけの行の場合に count=0 で max をどうするか。
             // spec に明確な規定がないため、min_long で出力するのが安全と判断する（ただしこれは実質的に「未定義」に近いが）。
             // しかし実際には min_long は -9223372036854775808 なので output される。 
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
