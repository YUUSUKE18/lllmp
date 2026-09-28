import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        try {
            int count = Integer.parseInt(line);
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }
        int sum = 0;
        int actualCount = 0;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                int num = Integer.parseInt(line);
                sum += num;
                actualCount++;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
