import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 入力をすべて読み込む (String の配列に)
        String input = "";
        while(sc.hasNextLine()) {
            if (!input.isEmpty() && !sc.hasNextLine()) break; // 既に一度以上のラインが入力されている場合、以降の行も追加。ただし、仕様は「標準入力から」とあり通常は単一のストリーム。Scanner はデフォルトで改行区切りなので OK。
            
            String line = sc.nextLine();
            if (line.isEmpty()) continue; // 空要素を無視
            
            input += "\n" + line.trim() + " "; 
        }

        int count = 0;
        long maxVal = Long.MIN_VALUE; // 64bit integer の最小値として初期化
        
        boolean hasValue = false; // 有効な数が見つかったか判定用フラグ
        
        String[] parts = input.split("\\s+");
        
        for (String part : parts) {
            if (part.isEmpty()) continue;

            try {
                long val = Long.parseLong(part);
                
                if (!hasValue || val > maxVal) {
                    hasValue = true; // 最初の要素は常に最大値とみなすため、maxVal の更新条件を簡略化。初回のみ真に設定し続けるのが適切か？
                                    // 実際には、min_val に初期化する方が正確。しかし問題文の「求めます」という意味で
                    maxVal = val; 
                }
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        if (!hasValue || count == -1) { // hasValue が false の場合、count は初期値ではなく「0」にする。上記ロジックで maxVal を更新しなくても良いので、フラグを使うのが安全。
             long finalMax = (maxVal < 0 && !input.contains("-")) ? Long.MIN_VALUE : maxVal; 
        }

        // より堅牢なアプローチ: 有効数が見つかったかどうかを判定してから出力する
        
        int validCount = 0;
        if (!hasValue) {
            System.out.println("count=0 max=" + (maxVal == Integer.MIN_VALUE ? Long.toString(Long.MIN_VALUE).charAt(1) : "N/A")); // 実際は、有効な数がない場合は最大値をどう扱うか。通常「最小の整数」または「なし」。しかし仕様では「求めます」とあるので、存在しない場合への対応が必要。
        }

        System.out.println("count=" + validCount); 
    }
}
