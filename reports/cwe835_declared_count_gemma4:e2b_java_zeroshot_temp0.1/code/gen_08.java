import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        try {
            // 1行目を読み取り、続く整数の個数を取得
            String line1 = br.readLine();
            if (line1 == null || line1.trim().isEmpty()) {
                // 1行目が空の場合は終了
                return;
            }
            int expectedCount = Integer.parseInt(line1.trim());
            
            long sum = 0;
            int actualCount = 0;
            
            // 2行目以降を読み取り、整数を処理
            String line;
            while ((line = br.readLine()) != null) {
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    // 空行は無視
                    continue;
                }
                
                try {
                    // 整数として解釈を試みる
                    long number = Long.parseLong(trimmedLine);
                    
                    // 読み取れた整数を対象とする
                    sum += number;
                    actualCount++;
                    
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }
            
            // 最終結果を出力
            System.out.println("count=" + actualCount + " sum=" + sum);
            
        } catch (IOException e) {
            // 入力エラーが発生した場合（通常は競技プログラミング環境では発生しにくいが念のため）
            // この問題の仕様上、エラー時の出力形式は指定されていないため、ここでは何もしないか、
            // 処理を終了させる。
        }
    }
}
