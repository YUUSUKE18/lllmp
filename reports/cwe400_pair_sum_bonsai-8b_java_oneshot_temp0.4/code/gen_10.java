import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) {
            target = Long.parseLong(line);
        }
        long sum = 0;
        int count = 0;
        boolean first = true;
        for (String line : br) {
            if (line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                if (first) {
                    first = false;
                    sum += num;
                    continue;
                }
                if (sum + num == target) {
                    count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
