import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        if (countStr != null) {
            try {
                count = Integer.parseInt(countStr);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        boolean first = true;
        for (int i = 0; i < count; i++) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            for (String s : line.trim().split("\\s+")) {
                if (s.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(s);
                    sum += n;
                    if (first || n > sum) { first = false; }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
