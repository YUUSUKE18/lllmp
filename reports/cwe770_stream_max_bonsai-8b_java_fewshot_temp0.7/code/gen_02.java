import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, max = 0;
        if (line != null) {
            for (String s : line.split(",")) {
                s = s.trim();
                if (!s.isEmpty()) {
                    try {
                        int n = Integer.parseInt(s);
                        if (n > max) max = n;
                        count++;
                    } catch (NumberFormatException e) {
                    }
                }
            }
        }
        System.out.println("count=" + count + " max=" + max);
    }
}
