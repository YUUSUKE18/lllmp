import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        String[] parts = line.split(",");

        for (String part : parts) {
            if (part.trim().isEmpty()) continue;

            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    // 値 (value) は long で受け取る
                    long value = Long.parseLong(kv[0].trim());
                    // 回数 (count) は long で受け取る
                    long count = Long.parseLong(kv[1].trim());

                    if (count > 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
