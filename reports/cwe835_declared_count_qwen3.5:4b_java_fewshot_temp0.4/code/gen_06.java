import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int n;
        try {
            n = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            n = 0; // 無効な入力の場合、0 と扱う（ただし実際には読み取れない）
        }

        long sum = 0;
        int count = 0;

        while ((line1 = br.readLine()) != null) {
            String[] parts = line1.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long val = Long.parseLong(part);
                    sum += val;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
