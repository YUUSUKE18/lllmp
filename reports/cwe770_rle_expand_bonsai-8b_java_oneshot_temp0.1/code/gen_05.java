import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String s : line.trim().split(",")) {
                if (s.isEmpty()) continue;
                int value;
                int num;
                if (s.indexOf(':') == -1) continue;
                String[] parts = s.split(":");
                if (parts.length < 2) continue;
                value = Integer.parseInt(parts[0]);
                try {
                    num = Integer.parseInt(parts[1]);
                } catch (NumberFormatException e) {
                    continue;
                }
                if (first || num > count) { count = num; sum = value * num; first = false; }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
