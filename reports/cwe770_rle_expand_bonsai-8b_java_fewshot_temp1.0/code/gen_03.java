import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        String[] parts = line.trim().split(",");
        for (String part : parts) {
            String[] val = part.trim().split(":");
            if (val.length != 2) continue;
            try {
                int n = Integer.parseInt(val[0]);
                int k = Integer.parseInt(val[1]);
                if (n == 0 || k == 0) continue;
                count += k;
                sum += n * k;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
