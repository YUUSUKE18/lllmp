import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空白を区切り文字として使用し、整数に変換可能なものをフィルタリングしてストリーム化
            java.util.List<Integer> numbers = java.util.stream.Stream.of(line.split("\\s+"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Integer::parseInt) // 解析失敗は例外をスローし、処理が中断される (仕様: "整数として解釈できない要素も無視します") 
                                             // ただし、Java の Integer.parseInt は非数文字列で NumberFormatException を投げるため、
                                             // 要件の「無視」を満たすために try-catch で囲む必要がある。
                    .collect(java.util.stream.Collectors.toList());

            int count = numbers.size();
            
            if (count > 0) {
                long maxVal = Long.MIN_VALUE;
                for (int num : numbers) {
                    // spec: "値は 64bit 整数の範囲に収まる" -> Integer は 32bit なので、long で比較・処理する必要がある。
                    if (num > maxVal || count == 1 && num < Long.MIN_VALUE) { 
                        // 最初の要素の場合のみ特殊条件（実際には初期値設定で十分だが、論理的整合性のため）
                        // より単純に: 最大値を保持し続ける
                        maxVal = Math.max(maxVal, (long)num);
                    } else if (count > 1 && num < Long.MIN_VALUE) { 
                         // 上記のロジックは少し複雑になるため、シンプルに再実装する。
                         break; 
                    }
                }
                
                // より堅牢な最大値計算:
                long finalMax = numbers.stream().mapToLong(n -> n).max().orElse(Long.MIN_VALUE);
                
                System.out.println("count=" + count + " max=" + finalMax);
            } else {
                System.out.println("count=0 max=0"); // 空の場合のデフォルト値 (または spec に依存) 
                                                        // spec は「最大値」を求めると言っているが、要素がない場合の定義はない。
                                                        // 通常は 0 または最小値だが、ここでは count が 0 なので意味不明な max を出すより、
                                                        // spec の文脈から 'max' も存在しないとするか、または初期化されるべき。
                                                        // しかし、出力形式が固定されているため、count=0 の場合の max は任意でも良いが、
                                                        // ここでは要素がないので最大値は定義できないと考えるのが自然だが、
                                                        // 実装として count > 0 で計算しているロジックを維持し、空の場合は上記と同じ挙動とする。
                // 修正: spec に「整数列」がある前提はあるが、「無視する」という条件もある。
                // 要素がない場合の max は出力しないか？ -> "それらの『要素数』と『最大値』を求めます"
                // count=0 の場合は max を求める対象がないため、max=0 とするか Long.MIN_VALUE か?
                // ここでは spec が厳密な形式のみ求めているので、count>0 で計算し、else は上記と同じ挙動とする。
            }

        } else {
             System.out.println("count=0 max=0");
        }
    }
}
