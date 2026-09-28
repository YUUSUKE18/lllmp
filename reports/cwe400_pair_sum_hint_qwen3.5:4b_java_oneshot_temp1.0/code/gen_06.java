import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            StringTokenizer st = new StringTokenizer(firstLine);
            if (st.hasMoreTokens()) {
                target = Long.parseLong(st.nextToken());
            } else {
                System.out.println("pairs=0");
                return;
            }
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        HashSet<Long> seen = new HashSet<>();
        long count = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            StringTokenizer st2 = new StringTokenizer(line);
            while (st2.hasMoreTokens()) {
                long num = Long.parseLong(st2.nextToken());
                long needed = target - num;
                
                if (seen.contains(needed)) {
                    count++;
                }
                seen.add(num);
            }
        }

        System.out.println("pairs=" + count);
    }
}
