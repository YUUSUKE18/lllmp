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
                        // 値 (value) は int として読み込むが、回数 (count) は long の計算に使用する
                        int value = Integer.parseInt(kv[0].trim());
                        long count = Long.parseLong(kv[1].trim());

                        // 要素数と合計を計算
                        totalCount += count;
                        totalSum += (long) value * count;
                    } catch (NumberFormatException e) {
                        // 数値変換エラーが発生した場合は無視する
                        continue;
                    }
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
