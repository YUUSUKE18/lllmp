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
            }
        }
        int actualCount = 0;
        long actualSum = 0;
        int lineNum = 1;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                actualCount++;
                actualSum += num;
            } catch (NumberFormatException e) {
            }
            lineNum++;
        }
        System.out.println("count=" + count + " sum=" + actualSum);
    }
}
