import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を考慮する必要があるが、問題文は「整数列を受け取る」とあるので、少なくとも1つあると仮定するか、または最小値を使用。ただし例ではmax=0で初期化されているので同様に扱うのが自然だが、空の場合は定義上最大値が存在しないため Long.MIN_VALUE またはエラー処理が必要。しかし、課題の意図を考えると「整数列」が与えられる前提とするか、あるいは実際の入力が存在するとしてコードを書く。
            // 再考: 例1では max=0 が初期化されており、空の場合も出力される形になっている。同様に count=0 の場合でも最大値は定義できないので、Long.MIN_VALUE を用いるのが安全だが、より適切なのは「整数が少なくとも1つ存在する」という前提か、「不存在」の場合は特殊処理。
            // しかし、仕様では「整数列を受け取る」「要素数と最大値を求めます」とあるので、空でないリストがあることを暗黙的に想定してもよいが、robustness のために空のケースも考慮すべきだ。
            // ただし、例1は max=0 で初期化しており、もし入力がない場合でも出力する形になっているため、同様に count=0 の場合は最大値を何らかのデフォルトで出力するか、あるいは Long.MIN_VALUE を用いるのが合理的。
            // 実際の実装では、空の場合は count=0, max=Long.MIN_VALUE とするのが一般的だが、問題文の「整数列」が少なくとも1つあることを前提とすることも可能。ここでは安全側に置き、空の場合も処理するコードとする。
        }

        StringTokenizer st = new StringTokenizer(line); // カンマ区切りではなく、空白やカンマを区切れるようにする必要があるか？ 問題文は「カンマ区切りの整数列」とあるが、例1では「空白区分」で split(" ") を使っている。
        // 【仕様】を確認: 「カンマ区切りの整数列を受け取ります。」とあるので、入力形式は "1,2,3" のようなものか？ 
        // しかし、日本語の文脈や一般的な CP 問題では「空白またはカンマで区切る」ことが多いため、両方の区切り文字を考慮すべきだ。
        // ただし、「カンマ区切りの整数列」と明確に書かれているので、入力例は "1,2,3" のような形式と推測されるが、実際には空白も含まれる可能性がある（例:  "1 , 2 , 3"）。
        // より安全なアプローチとして、カンマや空白で区切るトークン化を行う。

        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split("[,\\s]+"); // カンマまたは空白（複数連続）で分割する
            
            for (String part : parts) {
                if (part.isEmpty() || part.equals(" ")) continue; 
                try {
                    long n = Long.parseLong(part);
                    if (!first || n > max) {
                        max = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        long count = 0;
        boolean hasElement = false;
        
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split("[,\\s]+"); 
            for (String part : parts) {
                try {
                    Long.parseLong(part); // 実際に解析して数える（count 用）
                    count++;
                    hasElement = true;
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        if (!hasElement || max == Long.MIN_VALUE && !first) { 
            // もし要素が一つもない場合、max は未定義。このケースでは count=0 のまま出力するか？
            // 例1では空の場合でも「max=<最大>」と出力されており、初期値で処理されているため、同様に max を Long.MIN_VALUE で出力するのが一致する。
        }

        System.out.println("count=" + count + " max=" + (hasElement ? max : Long.MIN_VALUE)); // 要素がない場合は Long.MIN_VALUE とするか？あるいは問題の意図を考えると「整数列」が少なくとも1つあると仮定することも可能だが、robustness を優先する。
        // さらに再考: 例1では空の場合でも出力される形になっている（max=0）。同様に count=0 の場合は max は何らかの値でなければならないため、Long.MIN_VALUE で統一する。

    }
}
