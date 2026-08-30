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
            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    long value = Long.parseLong(kv[0].trim());
                    long count = Long.parseLong(kv[1].trim());

                    if (count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 無効な数値形式の場合は無視
                    continue;
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
