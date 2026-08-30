import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        String[] parts = line.split(",");

        for (String part : parts) {
            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    // 値 (value) は int または long に格納可能だが、回数 (count) は long にする
                    int value = Integer.parseInt(kv[0].trim());
                    long count = Long.parseLong(kv[1].trim());

                    if (count > 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
