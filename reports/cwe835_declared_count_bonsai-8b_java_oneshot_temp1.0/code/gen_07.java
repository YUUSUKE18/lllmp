import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        boolean first = true;
        long sum = 0;
        if (countStr != null) {
            try {
                count = Integer.parseInt(countStr);
            } catch (NumberFormatException e) {
            }
        }
        for (int i = 0; i < count; i++) {
            String line = br.readLine();
            if (line == null) break;
            for (String token : line.trim().split("\\s+")) {
                if (token.isEmpty()) continue;
                try {
                    long n = Long.parseLong(token);
                    sum += n;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
