import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String s : line.trim().split(",")) {
                if (!s.trim().isEmpty()) {
                    try {
                        int n = Integer.parseInt(s);
                        if (!count || n != count) {
                            count++;
                        }
                        sum += n;
                    } catch (NumberFormatException e) {
                    }
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
