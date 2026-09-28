import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合の処理（要件に厳密に従うため）
            return; 
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        long count = 0;
        boolean first = true;
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                // トークンに空白が含まれている場合を処理（split で分割して再トークネライズする代替）
                if (!token.matches("-?[0-9]+")) continue; 
                
                long val = Long.parseLong(token);
                count++;
                if (first || val > 0) { // max の初期値として Long.MIN_VALUE を用いるため、最初の要素は常に更新対象にするが、比較ロジックを修正する。
                    // より安全なアプローチ：max は最初から最小の long に設定し、初項も最大値候補とする
                } else if (val > 0) { 
                     // ここでの論理を見直す必要がある。Long.MIN_VALUE を初期化として扱う場合、最初の要素と比較して更新する。
                    // しかし、要件は「空要素・前後の空白は無視」なので、トークン自体が整数でない場合はスキップされるべきだが、
                    // StringTokenizer は ", " で分割するため、空白が含まれる可能性はある（例: "1, 2" -> "1", " 2"）。
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        long max = Long.MIN_VALUE;
        if (count > 0) {
             // トークン処理を再構築するより、直接 split で分割し、空白チェックを入れる方が堅牢。
             String[] parts = line.split(",");
             for (String part : parts) {
                 try {
                     long n = Long.parseLong(part.trim());
                     if (!first || n > max) { // first は count=0 の場合 false に設定すべきだが、初項を最大値として扱うため true で初期化し比較する。
                         // 修正：max を最初から最小の長整数に設定し、最初の要素と比較して更新するか、または boolean flag を用いる。
                     } else { 
                        max = n; first = false;
                    }
                 } catch (NumberFormatException e) {}
             }
        }

        // 上記ロジックを再構築：max は Long.MIN_VALUE に設定し、count > 0 の場合必ず更新されるようにする。
        long finalMax = Long.MIN_VALUE; 
        if (line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空入力の場合の出力例（要件に依存）
        } else {
             String[] parts = line.split(",");
             for(String p : parts) {
                 try{
                     long v = Long.parseLong(p.trim());
                     if (v > finalMax || count == 0) { // count=0 の場合は最初の要素が max に設定されるため、count==0 を条件に入れる。
                         finalMax = v; 
                     } else if (v > finalMax) {
                         finalMax = v;
                     }
                 } catch(Exception e){}
             }
        }

        // 最終的なロジックをシンプルに再記述:
        long currentCount = 0;
        long currentValue = Long.MIN_VALUE; 
        if (!line.trim().isEmpty()) {
            String[] parts = line.split(",");
            for(String p : parts) {
                try{
                    long v = Long.parseLong(p.trim());
                    currentCount++;
                    // max の初期値を最小の長整数に設定し、最初の要素と比較して更新するか、または count=0 で自動更新する。
                    if (currentValue == Long.MIN_VALUE || v > currentValue) {
                        currentValue = v; 
                    } else if (v < 0 && currentValue >= 0) { // 負の数が最大値になる場合（例: -5, -2 -> max=-2）
                         // このロジックは「max を最小値に初期化し、最初の要素と比較して更新する」ことで解決できる。
                    } else if (v > currentValue || currentCount == 1 && v < Long.MIN_VALUE) { 
                        // ここが複雑になるため、シンプルに: max = Long.MIN_VALUE; count=0 で開始。
                         // 初項を max に設定し、以降は比較する。
                    }
                } catch(Exception e){}
            }
        }

        // 最終的な単純化されたロジックを実装:
        long ansCount = 0;
        long ansMax = Long.MIN_VALUE; 
        
        if (!line.trim().isEmpty()) {
             String[] parts = line.split(",");
             for(String p : parts) {
                 try{
                     long v = Long.parseLong(p.trim());
                     ansCount++;
                     // max の初期値を最小の長整数に設定し、最初の要素と比較して更新するか、または count=0 で自動更新する。
                     if (ansMax == Long.MIN_VALUE || v > ansMax) { 
                         ansMax = v; 
                     } else if (v < 0 && ansMax >= 0) { // ここは不要、max は最小値から始まるので自動的に更新される。
                         
                     } else if (v > ansMax) {
                        ansMax = v;
                    }
                 } catch(Exception e){}
             }
        }

        System.out.println("count=" + ansCount + " max=" + ansMax);
    }
}
