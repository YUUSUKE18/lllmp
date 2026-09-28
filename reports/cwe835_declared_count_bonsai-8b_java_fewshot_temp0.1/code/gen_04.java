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
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                count++;
                sum += num;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
