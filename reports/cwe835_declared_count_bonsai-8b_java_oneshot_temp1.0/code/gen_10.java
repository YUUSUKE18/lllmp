import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        if (line != null) {
            try {
                count = Integer.parseInt(line);
            } catch (NumberFormatException e) {
                count = 0;
            }
        }
        int max = 0;
        boolean first = true;
        for (int i = 0; i < count; i++) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (first || n > max) { max = n; first = false; }
                count++;
                sum += n;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
