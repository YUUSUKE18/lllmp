import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        StringTokenizer tokenizer = new StringTokenizer(line);
        int count = 0;
        long maxValue = Long.MIN_VALUE; // 初期値を最小値に設定（ただし、実際には最初の有効要素で更新する）
        
        while (tokenizer.hasMoreTokens()) {
            String token = tokenizer.nextToken();
            try {
                long value = Long.parseLong(token);
                count++;
                
                if (count == 1) {
                    maxValue = value; // 最初のエレメントを初期値とする
                } else {
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
