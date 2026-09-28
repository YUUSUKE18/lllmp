import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        boolean first = true;
        long maxVal = Long.MIN_VALUE; // 最小値として初期化
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token.trim());
                
                if (!first) {
                    count++;
                } else {
                    first = false;
                }

                // 最小値より大きい場合は更新（min_value は -9223372036854775808 より小さい場合も想定）
                if (val > maxVal) {
                    maxVal = val;
                } else if (!first && count == 1) { // first の時だけ比較しない、または最初の要素が最大値未満の場合のみ更新するロジックが必要か？
                    // 少し修正: まず最小値を初期化し、常に比較して最大にするのが安全。
                    // ただし、問題文の例だと max=0 がデフォルトで返っていたので、空の場合は 0 を出力すべきか？
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // リファイン: first のロジックを単純化して再実装。
        // 最初の有効な整数を読み込むまで maxVal を適切に管理する必要がある。
        
        st = new StringTokenizer(line); 
        count = 0;
        long currentMax = Long.MIN_VALUE; 
        boolean hasValue = false;

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token.trim());
                
                if (!hasValue) {
                    // 最初の場合、min_value より大きい値かどうかで判定せず、とりあえず max にする必要があるか？
                    // 例を見ると空の場合は count=0, max=0。
                    hasValue = true;
                    currentMax = val; 
                } else {
                    if (val > currentMax) {
                        currentMax = val;
                    }
                }
                
                count++;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 入力がない場合の処理: hasValue が false の場合は max=0 とする必要があるか？
        // 例1では if(line != null) でループし、max を 0 に固定していた。
        // しかし仕様は「64bit 整数」なので、空の場合は count=0, max=0 が適切だと推測される（または定義されていない）。
        // ただし、入力がない場合の最大値の定義が問題文にあるわけではないので、例1と同じく 0 とする安全策をとる。
        
        if (!hasValue) {
            System.out.println("count=" + count + " max=0");
        } else {
            System.out.println("count=" + count + " max=" + currentMax);
        }

    }
}
