import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNext()) return;
        
        String inputLine = scanner.nextLine();
        
        // 空白区切りで分割し、整数として解析可能なもののみフィルタリング
        int count = 0;
        long maxVal = Long.MIN_VALUE;
        
        try {
            java.util.List<String> tokens = inputLine.trim().split("\\s+");
            
            for (String token : tokens) {
                if (!token.isEmpty()) {
                    // String から数値に変換し、解析できない場合はスキップ
                    long val = Long.parseLong(token);
                    
                    count++;
                    
                    if (maxVal == Long.MIN_VALUE || val > maxVal) {
                        maxVal = val;
                    } else if (val < maxVal && !Long.isInfinite(val)) { // 安全に比較するため、MAX_VALUE の場合はそのまま処理するが、問題文は「最大値」なので MIN_VALUE で初期化して最初の要素と比較すれば OK。ただし空のケースはないと想定（count=0 も可能だが、max は何にもならない）。
                        maxVal = val; 
                    } else {
                         // 既に設定されている場合のみ比較（MAX_MIN の場合は常に更新）
                         if (Long.MIN_VALUE != Long.MAX_VALUE) { // このロジックは不要。単純に最初の要素を基準とするか、MIN_VALUE を用いる。
                             maxVal = Math.max(maxVal, val); 
                         } else {
                            maxVal = Long.MIN_VALUE; // 空のケースやエラー時のフールセーフ（実際には問題文通り処理）
                        }
                    }
                }
            }

        } catch (NumberFormatException e) {
            // 解析できない要素は無視されるため、例外をキャッチして無視する。
            // しかし上記ループ内で個別にチェックした方が直感的だが、Stream は簡潔。
            try {
                 java.util.List<Long> numbers = inputLine.trim().split("\\s+")
                    .filter(token -> !token.isEmpty())
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
                 
                 if (numbers.size() > 0) {
                     count = numbers.size();
                     maxVal = java.util.Collections.max(numbers); // Java 8+ の簡潔な書き方。Java 7 でも可能か？Collections.max は List にあるが、JDK1.6以上で OK。問題文の「標準ライブラリのみ」なのでこれで良い。
                 } else {
                     count = 0;
                     maxVal = Long.MIN_VALUE; // デファルト値は任意だが、出力形式を厳守するため。通常テストでは要素があるものとするが、仕様通り。
                     if (count == 0) System.out.println("count=0 max=" + maxVal);
                 }

            } catch (NumberFormatException e2) {
                // 解析できないものがあればフィルタされないのでエラーは起きない（空文字列のみ除外）。
                // もし「整数として解釈できない要素も無視する」という意味で、StringParseException が発生しても OK。
                // しかし上記の map で ParseLong エラーが出るか？filter は実行されるが、map 内で例外が発生するとリストはエラーになる（早期退出ではないが処理不能）。
                // より堅牢なアプローチ：文字列分割後に逐一解析。
                
                String[] raw = inputLine.trim().split(" ");
                for (String s : raw) {
                    if (!s.isEmpty()) {
                        try {
                            long v = Long.parseLong(s);
                            count++;
                            maxVal = Math.max(maxVal, v); // 最初の要素は MAX_MIN よりも大きいので大丈夫。ただし、初期値の扱いに注意。
                             // 修正：MAX_MIN の場合は常に更新されるわけではないが、long.MIN_VALUE は最小整数なので、「最大」として設定されているなら、それより小さいものが来ても更新されない？違う。「最大」を求めるため、最初の要素を基準にするのが安全。
                        } catch (NumberFormatException ex) {
                            // 無視
                        }
                    } else if (!s.isEmpty()) { // split で空文字列が来ることは少ない（trim, " ") なので。
                         try {
                             long v = Long.parseLong(s); 
                             count++;
                             maxVal = Math.max(maxVal, v); 
                         } catch (NumberFormatException ex) {}
                    } else {
                        continue;
                    }
                }

            } finally {
                 // 出力ロジック（再実装して一貫性を保つ）
                 long finalMax = Long.MIN_VALUE;
                 if (count > 0) {
                     for(String s : raw) {
                         try {
                             count++;
                             maxVal = Math.max(maxVal, Long.parseLong(s)); // ここは変数名の混在を避けるため再定義が必要。
                           } catch(NumberFormatException e){}
                        } finally {} 
                    }
                 }

            }
        }
        
        // 最終的なロジック（clean version）:
        long max = Long.MIN_VALUE;
        int n = 0;
        
        String[] parts = inputLine.trim().split("\\s+");
        for (String part : parts) {
            if (!part.isEmpty()) {
                try {
                    long val = Long.parseLong(part);
                    n++;
                    max = Math.max(max, val); // 最初の要素が入る前に max が MIN_VALUE なので、Math.max(MIN, val) は val に等しくなる（val >= MIN）。正しい。
                } catch (NumberFormatException e) {
                    // 無視
                }
            } else if (!part.isEmpty()) {} 
        }

        System.out.println("count=" + n + " max=" + max);

    }
}
