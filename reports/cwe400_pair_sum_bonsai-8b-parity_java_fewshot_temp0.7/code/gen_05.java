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
            } catch (NumberFormatException e) {}
        }
        long sum = 0, count = 0;
        int index = 0;
        while ((index = br.readLine()) != null) {
            if (index.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(index.trim());
                sum += num;
                if (sum > target && count < 2) count++;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + count);
    }
}
