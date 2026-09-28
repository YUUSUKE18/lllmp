import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
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
            if (part.isEmpty() || !isColonFormat(part)) {
                continue;
            }

            StringTokenizer tokenizer = new StringTokenizer(part, ":");
            if (!tokenizer.hasMoreTokens()) {
                continue;
            }
            
            String valueStr = tokenizer.nextToken().trim();
            String countStr = "";
            
            if (tokenizer.hasMoreTokens()) {
                countStr = tokenizer.nextToken().trim();
            }

            try {
                long val = Long.parseLong(valueStr);
                long cnt = 0;
                if (!countStr.isEmpty()) {
                    cnt = Long.parseLong(countStr);
                }
                
                if (cnt >= 0) { // 回数は 0 以上
                    count += cnt;
                    sum += val * cnt;
                }
            } catch (NumberFormatException e) {
                // 無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }

    private static boolean isColonFormat(String part) {
        int colonIndex = part.indexOf(':');
        return colonIndex > 0 && part.length() > colonIndex;
    }
}
