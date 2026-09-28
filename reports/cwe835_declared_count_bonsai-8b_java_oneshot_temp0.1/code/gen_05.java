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
        for (int i = 0; i < count; i++) {
            String nextLine = br.readLine();
            if (nextLine == null) break;
            if (nextLine.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(nextLine);
                sum += num;
                count++;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
