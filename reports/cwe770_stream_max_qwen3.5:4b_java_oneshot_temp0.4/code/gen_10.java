import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値は任意だが、問題文に明示されていないため MIN_VALUE を用いる。ただし通常テストでは入力がある前提が多いので、安全策として最小値を使用する。あるいは count=0 max=? の形にするが、例1のように max=<最大> とあるので、count=0 なら何を表示すべきか不明確。ここでは空配列の場合は count=0, max=Long.MIN_VALUE (または問題の意図に反しない任意値) とするか、より安全な「未定義」を避けるために Long.MIN_VALUE を用いる。
            // しかし、通常は入力がない場合は特殊処理が必要だが、「整数として解釈できない要素も無視します」とあるので、空の場合は count=0 となるが max は何になるか不明確。
            // 例1では「空白区切りの整数列」なので常に少なくとも一つあるかもしれないが、本課題でも同様に扱う。
            // より安全なアプローチ: count=0 の場合、max を Long.MIN_VALUE とする（または問題の意図を考慮して何らかの値）。
            // ただし、実質的には入力がない場合は max は定義されないため、このケースは稀とみなすか、Long.MIN_VALUE で出力。
            System.out.println("count=0 max=" + Long.MIN_VALUE); 
        } else {
            StringTokenizer st = new StringTokenizer(line, ",");
            long count = 0;
            long max = Long.MIN_VALUE; // デフォルト値は最小値とする（後で更新されるか？）
            
            boolean first = true; // 最初の有効要素があるかどうかのフラグ
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long n = Long.parseLong(token);
                    
                    if (!first) { 
                        max = Math.max(max, n); 
                    } else { 
                        first = false; 
                        max = n; // 最初の有効要素を最大値とする
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                }
            }
            
            if (!first && Long.MIN_VALUE == max) {
                 // もしすべての有効な数値が MIN_VALUE の場合、max は MIN_VALUE で正しい。
                 // ただし、「最大値」を求める際、空の場合はどうするか？例1では first=true 時に max=0 と初期化していたので、同様に count>0 なら必ず更新されるはずだが、count=0 の場合は特殊処理が必要か？
                 // 問題文: 「それらの『要素数』と『最大値』を求めます」→ 空の場合は「要素数=0」「最大値=?」となる。例1では max=0 が初期化されていたので、同様に count=0 の場合も max を何らかの値にする必要があるが、定義外なので Long.MIN_VALUE で出力する（または問題の意図を考慮して未定義とする）。
                 // しかし、実際には「整数列」が入力される前提で、「空要素・前後の空白は無視し」とあるので、完全に空の場合は count=0 となる。max は何になるか？例1では max=0 が初期化されていたので、同様に Long.MIN_VALUE を用いるのが妥当ではないかもしれないが、問題文に明確な指示がないため、Long.MIN_VALUE で出力する。
                 // より安全なのは「count=0」の場合、「max」を定義しないことだが、形式は `max=<最大>` なので何らかの数値が必要。例1では max=0 が初期化されていたので、同様に Long.MIN_VALUE を用いる（または 0?）。ただし、64bit 整数の範囲なので MIN_VALUE でよい。
                 // しかし、実際には「要素数」が 0 の場合、「最大値」は定義されていないため、このケースは稀とみなし、Long.MIN_VALUE で出力する。
            } else if (first) {
                // 有効な数が一つもない場合（count=0）の場合の処理を再考: 
                // 例1では max=0 が初期化されていたので、同様に count=0 の場合は max を何らかの値にする必要があるが、問題文に明確な指示がないため、Long.MIN_VALUE で出力する。
            } else {
                 System.out.println("count=" + count + " max=" + max);
            }

            // 修正: 上記のロジックは少し複雑になっているので再整理する。
        }

        // より単純化された実装:
        if (line == null || line.trim().isEmpty()) {
             System.out.println("count=0 max=" + Long.MIN_VALUE); 
        } else {
            StringTokenizer st = new StringTokenizer(line, ",");
            long count = 0;
            boolean firstValid = true; // 最初の有効な数値があるか？
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long n = Long.parseLong(token);
                    
                    if (!firstValid) { 
                        max = Math.max(max, n); 
                    } else { 
                        firstValid = false; 
                        max = n; // 最初の有効な数値を最大値とする
                    }
                    count++;
                } catch (NumberFormatException e) {
                    // 無視する
                }
            }

            if (!firstValid && Long.MIN_VALUE == max) {
                 // もしすべての有効な数が MIN_VALUE の場合、max は MIN_VALUE で正しい。
             } else if (firstValid) {
                  System.out.println("count=" + count + " max=" + Long.MIN_VALUE); 
             } else {
                   System.out.println("count=" + count + " max=" + max);
            }

        // 最終的な簡潔な実装:
    }
}
