import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target = Long.parseLong(targetLine.trim());
        HashSet<Long> seen = new HashSet<>();
        int count = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long n = Long.parseLong(st.nextToken());
                    long complement = target - n;
                    if (seen.contains(complement)) {
                        count++;
                    }
                    seen.add(n);
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
