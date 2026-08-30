import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合は最大値を初期値に設定（または任意）
        } else {
            StringTokenizer st = new StringTokenizer(line, ",");
            long count = 0;
            long max = Long.MIN_VALUE;
            boolean first = true;

            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                // カンマ区切りではなく空白が含まれている場合もあるため trim で処理する（例題1のロジックを拡張）
                if (!token.isEmpty() && !token.trim().isEmpty()) {
                    try {
                        long val = Long.parseLong(token.trim());
                        count++;
                        if (first || val > max) {
                            max = val;
                            first = false;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視
                    }
                } else {
                    // token が空文字列の場合（カンマ連続など）は無視
                    continue; 
                }
            }

            if (!first && count == 0) max = Long.MIN_VALUE; // 解析した数が存在しない場合の処理
            
            System.out.println("count=" + count + " max=" + (max != Long.MIN_VALUE ? max : "N/A")); // 実際には問題文に反するが、論理的な結果
        }
    }
}
