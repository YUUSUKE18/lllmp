import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を考慮するが、問題文より「整数列」とあるので最小値は必要ない。ただし count=0 の場合の最大値定義がないため、実装上は最初の要素で更新されるようにする。
            return; 
        }

        StringTokenizer st = new StringTokenizer(line);
        
        long maxVal = Long.MIN_VALUE; // 初期化（実際には最初の有効な数が入るまで変更される）
        int count = 0;
        boolean first = true;
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long n = Long.parseLong(token);
                if (first || n > maxVal) {
                    maxVal = n;
                }
                count++;
                first = false; // 最初の要素が処理されたらフラグを切り、以降は常に更新条件を満たすかチェックする（ただし「>」のみなので等しい場合は更新しない。これは問題文の意図に反さない）
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 入力がない場合や有効な整数がなかった場合の処理
        if (!first && count > 0) {
             System.out.println("count=" + count + " max=" + maxVal);
        } else {
            // 問題文「空白区切りの整数列」に相当する「カンマ区切りの整数列」として、空または無効なみの場合の挙動は未定義だが、安全側に回す。
            // ただし例1では count=0 の場合は max を出力していない（max=0 と固定）。ここでは同様に処理するか、あるいは最大値が存在しない場合は何もしないが、問題文「それらの『要素数』と『最大値』を求めます」なので、存在する場合のみ出力すべきか。
            // 例1のコードを見ると、空の場合 max=0 を出力している（max の初期化）。同様にここでは count=0, max=? とする必要があるが、問題文に「整数列」とあるので少なくとも 1 つあると想定される場合が多い。
            // しかし厳密に従うなら、count=0 の場合は最大値は定義できないため、例1と同じく max を何らかの初期値（ここでは Long.MIN_VALUE または何もしない）にするか。
            // 例1では「max=<最大>」と出力しているので、空の場合も出力する形になっている。同様に count=0, max=? とするが、問題文に明確な指示がないため、実装上は最初の要素で更新されるように初期化し、もし update が起きなければ何らかの値を返す必要がある。
            // 例1では int max = 0; で始まっているので、負数が入らない場合のみ 0 を出力している（ただし整数列なら負数も入る可能性がある）。
            // ここでも long minVal = Long.MAX_VALUE として初期化し、更新されない場合はその値を返すのが合理的だが、例1の挙動（max=0）に合わせるか。
            // 問題文「それらの『要素数』と『最大値』」なので、空の場合は定義できないため、出力しない方が正しいかもしれないが、例1は常に出力している。
            // ここでは count > 0 の場合のみ max を更新するロジックを維持し、count=0 の場合は何もしない（または初期値）とする。
            // ただし、問題文の「整数列」という言葉から少なくとも 1 つあると想定されるが、安全のために空の場合も処理する。
            
            if (count == 0) {
                System.out.println("count=0 max=" + Long.MIN_VALUE); 
            } else {
                 // count > 0 の場合の出力（maxVal は更新されているはず）
                 System.out.println("count=" + count + " max=" + maxVal);
            }
        }
    }
}
