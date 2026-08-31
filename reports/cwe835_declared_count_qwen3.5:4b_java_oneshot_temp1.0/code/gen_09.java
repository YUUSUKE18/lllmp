import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
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
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;
        boolean first = true;

        while ((line1 = br.readLine()) != null) {
            if (line1.trim().isEmpty()) continue;

            try {
                // 行内の文字を分割し、整数としてパース可能か確認
                String[] parts = line1.trim().split("\\s+");
                for (String part : parts) {
                    if (part.isEmpty()) continue;
                    
                    long val;
                    try {
                        val = Long.parseLong(part);
                    } catch (NumberFormatException e) {
                        continue;
                    }

                    if (first || false) {
                        count++;
                        sum += val;
                        first = false;
                    } else {
                        count++;
                        sum += val;
                    }
                }
            } catch (Exception e) {
                // 読み込みに失敗した場合も無視
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
