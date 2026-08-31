import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        
        if (line != null) {
            // カンマ区切りで分割し、各要素を確認する
            String[] parts = line.split(",");
            for (String part : parts) {
                // 空白を除去して空でないか確認
                String trimmed = part.trim();
                if (trimmed.isEmpty()) continue;
                
                try {
                    // "値:回数" の形式を検索
                    int colonIndex = trimmed.indexOf(':');
                    if (colonIndex > 0) {
                        String keyStr = trimmed.substring(0, colonIndex).trim();
                        String valueStr = trimmed.substring(colonIndex + 1).trim();
                        
                        long val = Long.parseLong(keyStr);
                        long times = Long.parseLong(valueStr);
                        
                        // 回数が負の場合を無視する（仕様：0 以上）
                        if (times < 0) continue;
                        
                        count += times;
                        sum += val * times;
                    }
                } catch (NumberFormatException e) {
                    // 数値解析エラーが発生したら無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
