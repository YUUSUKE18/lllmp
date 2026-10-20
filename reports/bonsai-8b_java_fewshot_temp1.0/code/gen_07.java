import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        String[] parts = line.trim().split(",");
        for (String part : parts) {
            if (part.isEmpty()) continue;
            try {
                int n = Integer.parseInt(part);
                if (!count || n > sum) {
                    sum += n;
                    count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
