import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        long pairs = 0;
        int last = 0, cur = 1;
        while (cur < target) {
            String next = br.readLine().trim();
            if (next.isEmpty() || !next.matches("[0-9]+")) continue;
            cur += Long.parseLong(next.trim());
        }
        last = cur - target;
        cur = 0;
        while (cur < last) {
            String next = br.readLine().trim();
            if (next.isEmpty() || !next.matches("[0-9]+")) continue;
            cur += Long.parseLong(next.trim());
        }
        pairs = last / 2;
        System.out.println("pairs=" + pairs);
    }
}
