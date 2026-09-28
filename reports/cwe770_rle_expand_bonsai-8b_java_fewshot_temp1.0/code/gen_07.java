import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String s : line.split(",")) {
                if (s.trim().isEmpty()) continue;
                String[] parts = s.split(":");
                if (parts.length < 2) continue;
                try {
                    int val = Integer.parseInt(parts[0]);
                    int cnt = Integer.parseInt(parts[1]);
                    if (cnt <= 0) continue;
                    count += cnt;
                    sum += val * cnt;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
