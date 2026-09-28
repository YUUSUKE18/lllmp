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

        String[] parts = line.split(",");
        long count = 0;
        long sum = 0;

        for (String part : parts) {
            String[] kv = part.split(":");
            if (kv.length == 2) {
                try {
                    // 値 (value) は int に格納可能だが、回数 (count) は long で扱う
                    int value = Integer.parseInt(kv[0].trim());
                    int countVal = Integer.parseInt(kv[1].trim());

                    if (countVal > 0) {
                        // 要素数に加算
                        count += countVal;
                        // 合計に加算 (値 * 回数)
                        sum += (long) value * countVal;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換に失敗した場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
