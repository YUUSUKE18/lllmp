import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        long pairs = 0;
        boolean first = true;
        long sum = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long n = Long.parseLong(line.trim());
                if (first) {
                    sum = n;
                    first = false;
                } else {
                    sum += n;
                    if (sum == target) {
                        pairs++;
                    }
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
