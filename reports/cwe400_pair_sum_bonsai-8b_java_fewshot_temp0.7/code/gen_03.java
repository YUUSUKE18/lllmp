import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int count = 0;
        int numPairs = 0;
        int first = 1;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long n = Long.parseLong(line);
                if (first) {
                    first = false;
                    sum += n;
                    count++;
                } else {
                    if (sum + n == target) {
                        numPairs++;
                    }
                    sum += n;
                    count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + numPairs);
    }
}
