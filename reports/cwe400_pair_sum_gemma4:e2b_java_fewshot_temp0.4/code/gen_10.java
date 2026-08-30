import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());
        
        long count = 0;
        long previous = 0;
        
        // 2行目以降を読み込み、足して目標値になるペアを数える
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            try {
                long current = Long.parseLong(nextLine.trim());
                
                // 前の数との差が目標値になるかチェック
                // (current - previous) == target または (previous - current) == target
                if (Math.abs(current - previous) == target) {
                    count++;
                }
                
                // 次のループのために現在の値を保存
                previous = current;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 厳密に pairs=<個数> の1行を出力
        System.out.println("pairs=" + count);
    }
}
