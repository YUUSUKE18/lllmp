import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        long target = Long.parseLong(line);
        int count = 0;
        long sum = 0;
        boolean first = true;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long num = Long.parseLong(line);
                if (first) {
                    first = false;
                    sum += num;
                } else {
                    if (sum + num == target) count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
