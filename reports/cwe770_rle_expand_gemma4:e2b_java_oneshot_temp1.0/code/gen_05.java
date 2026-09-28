import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // 値:回数 の形式でカンマ区切りに分割
        String[] parts = line.split(",");

        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            // 値:回数 の形式で分割
            String[] kv = trimmedPart.split(":");
            if (kv.length == 2) {
                try {
                    int value = Integer.parseInt(kv[0]);
                    int count = Integer.parseInt(kv[1]);

                    // 値が正しく、回数が0以上の場合のみ処理
                    if (value >= 0 && count > 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーの場合は無視
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
