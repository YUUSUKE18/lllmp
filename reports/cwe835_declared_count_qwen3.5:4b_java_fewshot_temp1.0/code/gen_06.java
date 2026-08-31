import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        int totalInts = 0;
        try {
            int n = Integer.parseInt(line1.trim());
            for (int i = 0; i < n; i++) {
                String line = br.readLine();
                if (line == null) break;
                line = line.trim();
                if (line.isEmpty()) continue;
                long val;
                try {
                    val = Long.parseLong(line);
                } catch (NumberFormatException e) {
                    continue;
                }
                totalInts++;
            }
        } catch (NumberFormatException e) {
        }
        System.out.println("count=" + totalInts + " sum=0");
    }
}
