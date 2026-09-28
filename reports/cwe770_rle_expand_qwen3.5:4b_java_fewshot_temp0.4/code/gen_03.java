import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        for (String part : line.split(",")) {
            part = part.trim();
            if (part.isEmpty()) continue;

            String[] kv = part.split(":");
            if (kv.length != 2) continue;

            try {
                long value = Long.parseLong(kv[0].trim());
                long repeat = Long.parseLong(kv[1].trim());
                
                if (repeat < 0) continue; // 回数は 0 以上とするため

                count += repeat;
                sum += value * repeat;
            } catch (NumberFormatException e) {
                // 形式が間違っている場合は無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
