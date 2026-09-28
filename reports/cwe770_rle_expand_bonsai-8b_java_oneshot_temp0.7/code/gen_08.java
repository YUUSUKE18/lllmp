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
            try {
                int num = Integer.parseInt(val[0]);
                int freq = Integer.parseInt(val[1]);
                if (freq <= 0) continue;
                count += freq;
                sum += num * freq;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
