import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 正規表現: 空白を無視し、1 個以上の整数（負の数も可）でカンマ区切られていることを判定
            // ^[\s]* は行頭の空白を許容
            // (?:\d+|-?\d+(?:,\d+)*) は 1 つ以上の数字列（オプションのマイナスとカンマ付き追加数字を含む）
            // [\s]*$ は末尾の空白を許容
            if (line.trim().matches("(?:\\d+|-?\\d+(?:,\\d+)*)")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
