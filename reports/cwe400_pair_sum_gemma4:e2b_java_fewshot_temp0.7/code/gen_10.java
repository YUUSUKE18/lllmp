import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        long count = 0;
        long prev = 0;
        
        // 2行目以降の数値を読み込み、ペアの数を数える
        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long current = Long.parseLong(line.trim());
                
                // 前の数との差がターゲット値になるかチェック
                // (current - prev) == target
                // または (prev - current) == target
                if (Math.abs(current - prev) == target) {
                    count++;
                }
                
                // 次のループのために現在の値を保存
                prev = current;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
        
        // 厳密に pairs=<個数> の1行を出力
        System.out.println("pairs=" + count);
    }
}
