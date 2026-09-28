import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder sb = new StringBuilder();
        while (sc.hasNext()) {
            sb.append(sc.next());
        }
        
        String input = sb.toString();
        long count = 0;
        long sum = 0;
        
        // Split by comma to get individual entries
        String[] parts = input.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            
            int colonIndex = part.indexOf(':');
            if (colonIndex == -1) continue;
            
            String valStr = part.substring(0, colonIndex).trim();
            String cntStr = part.substring(colonIndex + 1).trim();
            
            try {
                long val = Long.parseLong(valStr);
                long cnt = Long.parseLong(cntStr);
                
                count += cnt;
                sum += val * cnt;
            } catch (NumberFormatException e) {
                // Ignore invalid elements
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
