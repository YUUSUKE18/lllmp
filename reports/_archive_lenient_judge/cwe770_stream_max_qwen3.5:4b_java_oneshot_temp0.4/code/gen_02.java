import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean hasValue = false;

        if (line != null && !line.isEmpty()) {
            for (String f : line.split(",")) {
                // 空白を除去し、空要素はスキップ
                String trimmed = f.trim();
                if (trimmed.isEmpty()) continue;

                try {
                    long n = Long.parseLong(trimmed);
                    
                    // 最大値の初期化: 最初の有効な数で設定するか、常に更新する形にする。
                    // ただし、「最小値」ではなく「最大値」なので、最初は何もしない（hasValue=false）が安全か、
                    // または最初に解析したものが max に代入されるように書く。
                    
                    if (!hasValue) {
                        count = 1;
                        hasValue = true;
                        max = n;
                    } else {
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する（仕様通り）
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
