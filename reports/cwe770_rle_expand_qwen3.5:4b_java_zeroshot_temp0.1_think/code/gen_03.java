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
        
        // Remove all whitespace to handle "whitespace around elements is ignored" effectively
        // and ensure comma separation logic holds.
        String normalized = input.replaceAll("\\s+", "");
        
        String[] parts = normalized.split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) continue;
            
            int colonIndex = part.indexOf(':');
            if (colonIndex == -1) continue;
            
            String valStr = part.substring(0, colonIndex);
            String cntStr = part.substring(colonIndex + 1);
            
            try {
                long value = Long.parseLong(valStr);
                long countVal = Long.parseLong(cntStr);
                
                if (countVal >= 0) {
                    count += countVal;
                    sum += value * countVal;
                }
            } catch (NumberFormatException e) {
                // Ignore invalid elements
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
