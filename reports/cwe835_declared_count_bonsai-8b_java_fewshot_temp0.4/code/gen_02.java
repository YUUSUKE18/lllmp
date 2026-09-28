import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            try {
                count = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int actualCount = 0, actualSum = 0;
        String[] parts = br.readLine().trim().split("\\s+");
        for (String part : parts) {
            if (part.isEmpty()) continue;
            try {
                int num = Integer.parseInt(part);
                actualCount++;
                actualSum += num;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + actualSum);
    }
}
