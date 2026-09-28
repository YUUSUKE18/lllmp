import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        int pairs = 0;
        boolean first = true;
        long sum = 0;
        for (String f : br.readLine().trim().split("\\s+")) {
            if (f.isEmpty()) continue;
            try {
                long n = Long.parseLong(f);
                sum += n;
                if (first) {
                    first = false;
                    continue;
                }
                if (sum == target) {
                    pairs++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
