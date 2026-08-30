import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long max = Long.MIN_VALUE;
        int count = 0;
        
        if (line != null && !line.isEmpty()) {
            // カンマ区切りで分割し、各要素を処理する
            for (String part : line.split(",")) {
                String trimmedPart = part.trim();
                
                // 空文字列スキップと数値パースの両方を一つの try-catch で扱う
                if (!trimmedPart.isEmpty()) {
                    try {
                        long val = Long.parseLong(trimmedPart);
                        
                        // 最初の有効な要素または新しい最大値が出現したら更新する
                        if (count == 0 || val > max) {
                            max = val;
                        }
                        count++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視
                    }
                }
            }
        } else if (!line.isEmpty()) {
             // line が空文字列の場合でも処理（count=0, max の初期値を保持）
             count = 0; 
        }

        System.out.println("count=" + count + " max=" + (max == Long.MIN_VALUE ? "" : max));
    }
}
