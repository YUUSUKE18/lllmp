import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        String[] parts = line.trim().split(",");
        for (String p : parts) {
            String[] val = p.trim().split(":");
            if (val.length != 2) continue;
            String v = val[0];
            String c = val[1];
            if (v.isEmpty() || c.isEmpty()) continue;
            try {
                int n = Integer.parseInt(v);
                int m = Integer.parseInt(c);
                if (m < 0) continue;
                count += m;
                sum += n * m;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
