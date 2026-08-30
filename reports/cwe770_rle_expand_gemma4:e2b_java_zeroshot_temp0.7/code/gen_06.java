import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        try {
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
                if (part.trim().isEmpty()) {
                    continue;
                }

                String[] kv = part.split(":");
                if (kv.length == 2) {
                    try {
                        // 値 (value)
                        int value = Integer.parseInt(kv[0].trim());
                        // 回数 (count)
                        int count = Integer.parseInt(kv[1].trim());

                        // 回数は 0 以上
                        if (count >= 0) {
                            totalCount += count;
                            totalSum += (long) value * count;
                        }
                    } catch (NumberFormatException e) {
                        // 数値変換エラーは無視する（仕様上、形式に合わないものは無視する）
                        continue;
                    }
                }
            }

            System.out.println("count=" + totalCount + " sum=" + totalSum);

        } catch (IOException e) {
            // 入力エラーは無視
        }
    }
}
