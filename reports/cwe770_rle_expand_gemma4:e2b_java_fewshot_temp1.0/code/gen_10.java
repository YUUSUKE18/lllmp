import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long totalCount = 0;
        long totalSum = 0;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String[] kv = part.trim().split(":");
                if (kv.length == 2) {
                    try {
                        int value = Integer.parseInt(kv[0]);
                        int count = Integer.parseInt(kv[1]);

                        if (count > 0) {
                            totalCount += count;
                            totalSum += (long) value * count;
                        }
                    } catch (NumberFormatException e) {
                        // パースエラーは無視
                    }
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
