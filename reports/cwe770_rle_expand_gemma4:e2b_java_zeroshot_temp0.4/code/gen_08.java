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
                        // 値 (value) は int に収まるが、回数 (count) は long になる可能性があるため、
                        // ここでは値と回数を読み取る
                        int value = Integer.parseInt(kv[0].trim());
                        long count = Long.parseLong(kv[1].trim());

                        // 値が正しく、回数が0以上であることを確認（仕様上は回数は0以上とあるが、値が無視される可能性も考慮し、値が意味を持つと仮定）
                        if (value >= 0 && count >= 0) {
                            totalCount += count;
                            totalSum += (long) value * count;
                        }
                    } catch (NumberFormatException e) {
                        // 数値変換エラーは無視する（仕様上、形式に合わないものは無視）
                        continue;
                    }
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
