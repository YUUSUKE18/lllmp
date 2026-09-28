import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目を読み取る（整数の個数 n を示す行）
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        // 2 行目以降を読み取る
        while ((line1 = br.readLine()) != null) {
            String trimmed = line1.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            try {
                long val = Long.parseLong(trimmed);
                count++;
                sum += val;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
