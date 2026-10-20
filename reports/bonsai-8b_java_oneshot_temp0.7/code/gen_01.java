import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        boolean seen = new boolean[1000000007]; // より広いインデックスに安全
        if (line != null) {
            for (String f : line.trim().split(",")) {
                f = f.trim();
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (!seen[n]) {
                        seen[n] = true;
                        count++;
                        sum += n;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
