import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        TreeSet<Long> seen = new TreeSet<>();
        long count = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            long[] parts;
            try {
                parts = Long.parseLong(line.trim()).split("\\s+");
            } catch (NumberFormatException e) {
                continue;
            }

            for (String part : parts) {
                if (part.isEmpty()) continue;
                
                try {
                    long val = Long.parseLong(part);
                    long needed = target - val;
                    
                    if (seen.contains(needed)) {
                        count++;
                    }
                    seen.add(val);
                } catch (NumberFormatException e) {
                    // 行内の個々の要素が数値でない場合も無視（問題文の意図により）
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
