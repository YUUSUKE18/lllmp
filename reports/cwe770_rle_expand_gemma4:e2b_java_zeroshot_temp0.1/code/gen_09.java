import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            if (part.contains(":")) {
                String[] kv = part.split(":");
                if (kv.length == 2) {
                    try {
                        // 値 (value) は無視し、回数 (count) を取得
                        int count = Integer.parseInt(kv[1].trim());
                        if (count >= 0) {
                            totalCount += count;
                            // 値は kv[0] にあるが、ここでは合計を計算する必要がないため無視する
                            // ただし、仕様上は「値:回数」の形式で入力されるため、値は無視して回数のみを処理する
                        }
                    } catch (NumberFormatException e) {
                        // 数値に変換できない場合は無視
                        continue;
                    }
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
