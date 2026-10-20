import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split(",")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first || n > sum) {
                        sum += n;
                        count++;
                    }
                } catch (NumberFormatException e) {
                }
                first = false;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
