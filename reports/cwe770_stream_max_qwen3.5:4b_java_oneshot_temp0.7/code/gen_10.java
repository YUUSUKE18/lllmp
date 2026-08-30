import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean hasValue = false;

        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                try {
                    String token = st.nextToken();
                    // 空白が含まれている場合のチェック（StringTokenizer は通常処理するが、念のため）
                    if (!token.matches("-?[0-9]+")) {
                        continue; 
                    }
                    
                    long val = Long.parseLong(token);
                    count++;
                    hasValue = true;
                    if (hasValue || maxValue == Long.MIN_VALUE) {
                        // 最初の値の場合や、初期化が必要な場合のみ比較のロジックを修正する必要があるが、
                        // ここでは単純に最大値を更新する。Long.MIN_VALUE は最小値なので正しく更新できる。
                        // ただし、入力がすべて負数の場合でも Long.MAX_VALUE 以上にならないように注意が必要だが
                        // 問題文は「64bit 整数の範囲」とあるので maxValue = Long.MIN_VALUE で初期化すれば OK。
                        if (val > maxValue) {
                            maxValue = val;
                        } else if (!hasValue && count == 1) { 
                           // もし hasValue が false のままカウントが incremented なら、maxValue を更新する必要があるか？
                           // 実際は上記の条件で十分だが、論理を明確にする。
                           maxValue = val;
                        } else if (val > maxValue) {
                            maxValue = val;
                        } 
                    }
                } catch (NumberFormatException e) {
                    continue;
                } finally {
                    // hasValue を true にする処理は count >= 1 で十分だが、論理的に正確にするため
                    if (!hasValue && count > 0) {
                         maxValue = val; 
                    } else if (val > maxValue || !hasValue) {
                        maxValue = val; // 最初の値を設定するロジックも含めるべきか？
                        // より安全なアプローチ:
                    }
                }
            }
            
            // リファクタリングにより、以下の単純化されたロジックで再実装する必要がある。
        }

        // 修正版の論理処理（簡略化して直接書く）
    }
}
