import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String inputLine = scanner.nextLine();
            
            // 空白を除去して分割するパターン
            Pattern pattern = Pattern.compile("\\s*");
            String[] parts = pattern.split(inputLine.trim());
            
            int count = 0;
            long maxValue = Long.MIN_VALUE;
            boolean hasValue = false;
            
            for (String part : parts) {
                try {
                    // カンマ区切りを処理するために、カンマも空白とみなす必要があるか？
                    // 「カンマ区切りの整数列」とあるので、例: "1, 2" または ", , " のような形もあるかもしれない。
                    // しかし通常「カンマ区切り」なら "," が区切り文字となるが、
                    // 仕様で「空白も無視する」とあるため、「1, 2」のように半角スペース混在の場合がある。
                    // JavaのString.splitは正規表現を受け取るため、[,\\s]+ とすることで両方を処理できるか検討が必要だが、
                    // 「整数として解釈できない要素を無視」という要件があるので安全なアプローチとする。
                    
                    long val;
                    try {
                        // 単一の文字列から数値を取り出す (カンマが含まれる場合は例外になるため別対策)
                        if (!part.contains(",")) {
                            val = Long.parseLong(part.trim());
                        } else {
                            throw new NumberFormatException("Invalid format");
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視 -> continue は使わずにループ継続
                        continue; 
                    } finally {}

                    if (!hasValue || val > maxValue) {
                        count++;
                        maxValue = val;
                    } else {
                        hasValue = true;
                        count++; // 既に最小値更新された場合もカウント対象とする (要素数とは異なるので注意: "要素数" とは入力された有効な数の総数を意味する通常解釈)
                        // しかし、上記のロジックで max が変わらなくても要素数は増える。
                    } 
                } catch (Exception e) {
                    continue;
                }
            }

            if (!hasValue || count == 0) {
                 System.out.println("count=0 max=" + Long.MIN_VALUE); // エラーケースのデフォルト値が必要か？仕様は「求めます」なので存在しないならどうするか不明。通常空の場合は 0 と MIN_VALUE でよい。
            } else {
                System.out.printf("count=%d max=%n", count, maxValue); 
                if (maxValue == Long.MIN_VALUE && !hasValue) { // 修正: hasValue は false の場合のみ MIN_VALUE を出力するが、上記ロジックでは hasValue=true なので常に設定される。
                     // リセットが必要か？初期値は Long.MIN_VALUE で OK.
                     System.out.println("count=0 max=" + Long.MIN_VALUE); 
                } else {
                    // 再確認: count の計算と maxValue の更新順序を整理するコードにする必要があるかもしれないが、基本ロジックは上記。
                    // より堅牢な実装へ修正:

                    long finalMax = (hasValue) ? maxValue : Long.MIN_VALUE; 
                     System.out.printf("count=%d max=%n", count, hasValue && !maxValue.equals(Long.MIN_VALUE)?maxValue:(!hasValue?Long.MIN_VALUE:-9223372036854775808L)); // 単純化のため直前の変数を使う。
                    
                    System.out.println("count=" + count + " max=" + maxValue); 
                }
            }
        } else {
             System.out.println("count=0 max=-9223372036854775808"); // 空入力の場合の処理
             return;
        }
        
    }
}
