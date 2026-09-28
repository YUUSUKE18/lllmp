import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                String[] kv = part.trim().split(":");
                if (kv.length == 2) {
                    try {
                        long value = Long.parseLong(kv[0]);
                        long countVal = Long.parseLong(kv[1]);
                        
                        if (countVal > 0) {
                            count += countVal;
                            sum += value * countVal;
                        }
                    } catch (NumberFormatException e) {
                        // 無効な数値の場合は無視
                    }
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
