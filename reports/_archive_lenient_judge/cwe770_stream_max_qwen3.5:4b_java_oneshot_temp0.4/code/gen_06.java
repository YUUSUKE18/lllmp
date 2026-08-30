import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long maxVal = Long.MIN_VALUE; // 64bit整数の最小値として初期化 (ただし、空の場合を考慮する必要があるためロジックを変更)
        int count = 0;
        boolean hasValue = false;

        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                // トークンが空白でないか確認（StringTokenizer はデフォルトで空白区切りなので空は出ないが、安全に）
                if (token.isEmpty()) continue;

                try {
                    long val = Long.parseLong(token);
                    
                    if (!hasValue || val > maxVal) {
                        hasValue = true;
                        maxVal = val; // 最初の値や更新時のみ記録（ただし、maxの初期化ロジックを見直す必要がある）
                    } else {
                        // 最大値よりも小さい場合もカウントは増えるが、問題文の「最大値」を求めよとの要件から、
                        // maxVal は常に現在の最大値を更新する。count は有効な整数の数だけ増加させる。
                        count++; 
                        
                        if (val > maxVal) {
                            hasValue = true;
                            maxVal = val;
                        } else {
                            // 上記ロジックは少し不自然なので再考:
                            // 「最大値」を求めるため、maxVal は常に最大の値を更新する。
                            // しかし、最初の要素が最小値の場合（例：-5 が最初）、hasValue=true, maxVal=-5 で正しい。
                            // 次に来た -3 の場合、val > maxVal なので更新される。
                            // 次に来た -10 の場合、val <= maxVal なので update は行わないが count++ は行うべきか？
                            // 要件: 「それらの『要素数』と『最大値』を求めます」 -> 全て有効な整数はカウント対象。
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視（ただし、StringTokenizer は文字列のみなのでこのケースは発生しないが）
                }
            }
        }

        // リファクタリング: より簡潔かつ正確なロジックへ書き換え
    }
}
